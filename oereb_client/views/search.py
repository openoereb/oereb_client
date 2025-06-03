# -*- coding: utf-8 -*-
import logging

from concurrent.futures import as_completed
from datetime import datetime
from pyramid.path import DottedNameResolver
from requests_futures.sessions import FuturesSession

from oereb_client.views import get_localized_text


log = logging.getLogger('oereb_client')


class Search():
    """
    Search view.
    """

    def __init__(self, request):
        """
        Entry point for search rendering.

        Args:
            request (pyramid.request.Request): The request instance.
        """
        self.request_ = request
        self.config_ = request.registry.settings.get('oereb_client', {})
        self.lang_ = request.params.get('lang') or self.config_.get('application').get('default_language')
        self.default_lang_ = self.config_.get('application').get('default_language')
        self.session_ = FuturesSession(max_workers=len(self.config_['search']))

    def create_request_(self, idx, config, term):
        request = self.session_.get(config['url'].format(
            term=term,
            lang=self.lang_,
            **config['params']
        ), timeout=10, verify=config.get('verify_certificate', True))
        request.index = idx
        return request

    def send_requests_(self):
        term = self.request_.params.get('term')
        requests = [self.create_request_(i, cfg, term) for i, cfg in enumerate(self.config_['search'])]
        return as_completed(requests)

    def render(self):
        """
        Returns search results.

        Returns:
            list of dict: The search results.
        """
        start_time = datetime.now()
        result_sets = []
        for i, req in enumerate(sorted(self.send_requests_(), key=lambda r: r.index)):
            response = req.result()
            if 'hook_method' in self.config_['search'][i]:
                method = DottedNameResolver().resolve(self.config_['search'][i]['hook_method'])
                results = method(self.config_['search'][i], response.json(), self.lang_, self.default_lang_)
            else:
                results = response.json()
            if results is not None:
                result_sets.append({
                    'title': get_localized_text(
                        self.config_['search'][i]['title'],
                        self.lang_,
                        self.default_lang_
                    ),
                    'results': results
                })
        end_time = datetime.now()
        duration = end_time - start_time
        ms = duration.total_seconds() * 1000
        term = self.request_.params.get('term')
        log.debug(f'Search took {ms} ms for term "{term}"')
        return result_sets

    @staticmethod
    def exception_handler_(request, exception):
        raise exception
