# -*- coding: utf-8 -*-
from pyramid.exceptions import ConfigurationError
from oereb_client import __version__


class Index(object):
    def __init__(self, request):
        """Entry point for index rendering.

        Args:
            request (pyramid.request.Request): The request instance.

        """
        self.request_ = request
        self.config_ = request.registry.settings.get('oereb_client', {})
        assert isinstance(self.config_, dict)

    def is_debug_(self):
        """Returns true if requested in debug mode.

        Returns:
            bool: True if requested in debug mode.

        """
        local = self.request_.application_url.startswith('http://localhost')
        debug = self.request_.params.get('debug') == 'true'
        return local and debug

    def get_google_analytics_(self):
        """Returns the configuration for Google Analytics.

        Returns:
            str or None: The Google Analytics configuration.

        """
        return self.config_.get('google_analytics', None)

    def get_custom_css_url_(self):
        """Returns the URL of the custom CSS file.

        Returns:
            str or None: The URL of the custom CSS file.

        """
        return self.config_.get('custom_css_url', None)

    def get_config(self):
        """Returns the JSON-encoded configuration.

        Returns:
            str: The JSON-encoded configuration.

        """
        return {
            'application_url': self.request_.route_url(
                '{0}/index'.format(self.request_.route_prefix)
            ),
            'application': self.config_.get('application', {}),
            'version': __version__,
            'view': self.config_.get('view', {}),
            'base_layer': self.config_.get('base_layer', {}),
            'availability': self.config_.get('availability', {}),
            'search': self.config_.get('search', {}),
            'support': self.config_.get('support', {}),
            'external_viewer': self.config_.get('external_viewer', {})
        }

    def render(self):
        """Returns the dictionary with rendering parameters.

        Returns:
            dict: Dictionary with rendering parameters.

        """
        return {
            'debug': self.is_debug_(),
            'google_analytics': self.get_google_analytics_(),
            'custom_css_url': self.get_custom_css_url_(),
            'config': self.get_config()
        }
