# -*- coding: utf-8 -*-
import grequests

from pyramid.path import DottedNameResolver


class Search(object):
    def __init__(self, request):
        """Entry point for search rendering.

        Args:
            request (pyramid.request.Request): The request instance.

        """
        self.request_ = request
        self.config_ = request.registry.settings.get('oereb_client', {})
        self.lang_ = request.params.get('lang') or self.config_.get('application').get('default_language')
        self.default_lang_ = self.config_.get('application').get('default_language')

    def create_request_(self, config, term):
        return grequests.get(config['url'].format(
            term=term,
            lang=self.lang_,
            **config['params']
        ), timeout=1)

    def send_requests_(self):
        term = self.request_.params.get('term')
        requests = [self.create_request_(cfg, term) for cfg in self.config_['search']]
        return grequests.map(requests, exception_handler=self.exception_handler_)

    def render(self):
        """
        Returns search results.

        Returns:
            list of dict: The search results.

        """
        results = []
        for i, req in enumerate(self.send_requests_()):
            if 'hook_method' in self.config_['search'][i]:
                method = DottedNameResolver().resolve(self.config_['search'][i]['hook_method'])
                result = method(self.config_['search'][i], req.json(), self.lang_, self.default_lang_)
            else:
                result = req.json()
            if result is not None:
                results.append(result)
        return results

    @staticmethod
    def exception_handler_(request, exception):
        raise exception
