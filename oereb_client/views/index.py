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
        self.validate_()

    def validate_(self):
        if not isinstance(self.config_, dict):
            raise ConfigurationError('Configuration needs to be a dictionary, got {0} instead'.format(
                type(self.config_)
            ))

        if not isinstance(self.config_.get('application'), dict):
            raise ConfigurationError('Missing "application" configuration')
        if 'title' not in self.config_.get('application'):
            raise ConfigurationError('Missing application title')
        if 'logo_canton' not in self.config_.get('application'):
            raise ConfigurationError('Missing cantonal logo')
        if 'logo_oereb' not in self.config_.get('application'):
            raise ConfigurationError('Missing OEREB logo')

        if not isinstance(self.config_.get('view'), dict):
            raise ConfigurationError('Missing "view" configuration')
        if 'map_x' not in self.config_.get('view'):
            raise ConfigurationError('Missing map_x in view configuration')
        if 'map_y' not in self.config_.get('view'):
            raise ConfigurationError('Missing map_y in view configuration')
        if 'map_zoom' not in self.config_.get('view'):
            raise ConfigurationError('Missing map_zoom in view configuration')
        if 'resolutions' not in self.config_.get('view'):
            raise ConfigurationError('Missing resolutions in view configuration')

        if not isinstance(self.config_.get('base_layer'), dict):
            raise ConfigurationError('Missing "base_layer" configuration')

        if not isinstance(self.config_.get('availability'), dict):
            raise ConfigurationError('Missing "availability" configuration')

        if not isinstance(self.config_.get('search'), dict):
            raise ConfigurationError('Missing "search" configuration')

        if not isinstance(self.config_.get('support'), dict):
            raise ConfigurationError('Missing "support" configuration')

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
