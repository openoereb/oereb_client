# -*- coding: utf-8 -*-
from oereb_client.views import get_localized_text


class Manifest():
    """
    Manifest view.
    """

    def __init__(self, request):
        """
        Entry point for manifest rendering.

        Args:
            request (pyramid.request.Request): The request instance.
        """
        self.request_ = request
        self.config_ = request.registry.settings.get('oereb_client', {}).get('application', {})

    def render(self):
        language = self.config_.get('default_language')
        return {
            'name': get_localized_text(self.config_.get('title'), language, language),
            'start_url': self.request_.route_url(f'{self.request_.route_prefix}/index')
        }
