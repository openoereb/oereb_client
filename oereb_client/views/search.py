# -*- coding: utf-8 -*-
import grequests

from pyramid.path import DottedNameResolver

from oereb_client.views import get_localized_text


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
        ), timeout=10, verify=config.get('verify_certificate', True))

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
        result_sets = []
        for i, req in enumerate(self.send_requests_()):
            if 'hook_method' in self.config_['search'][i]:
                method = DottedNameResolver().resolve(self.config_['search'][i]['hook_method'])
                results = method(self.config_['search'][i], req.json(), self.lang_, self.default_lang_)
            else:
                results = req.json()
            if results is not None:
                result_sets.append({
                    'title': get_localized_text(
                        self.config_['search'][i]['title'],
                        self.lang_,
                        self.default_lang_
                    ),
                    'results': results
                })
        return result_sets

    @staticmethod
    def exception_handler_(request, exception):
        raise exception
