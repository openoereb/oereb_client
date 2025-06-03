# -*- coding: utf-8 -*-
from pyramid.exceptions import ConfigurationError
from oereb_client import __version__


class Index():
    """
    Index view.
    """

    def __init__(self, request):
        """
        Entrypoint for index rendering.

        Args:
            request (pyramid.request.Request): The request instance.
        """
        self.request_ = request
        self.config_ = request.registry.settings.get('oereb_client', {})
        self.validate_()

    def validate_(self):
        if not isinstance(self.config_, dict):
            raise ConfigurationError(
                f'Configuration needs to be a dictionary, got {type(self.config_)} instead'
            )

        if not isinstance(self.config_.get('application'), dict):
            raise ConfigurationError('Missing "application" configuration')
        if 'title' not in self.config_.get('application'):
            raise ConfigurationError('Missing application title')
        if 'logo_canton' not in self.config_.get('application'):
            raise ConfigurationError('Missing cantonal logo')
        if 'languages' not in self.config_.get('application'):
            raise ConfigurationError('Missing available languages')
        if 'default_language' not in self.config_.get('application'):
            raise ConfigurationError('Missing default language')

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

        if not (
            isinstance(self.config_.get('search'), list) or
            isinstance(self.config_.get('search'), str)
        ):
            raise ConfigurationError('Missing "search" configuration')

        if not isinstance(self.config_.get('support'), dict):
            raise ConfigurationError('Missing "support" configuration')

    def is_debug_(self):
        """
        Returns true if requested in debug mode.

        Returns:
            bool: True if requested in debug mode.
        """
        local = self.request_.application_url.startswith('http://localhost')
        debug = self.request_.params.get('debug') == 'true'
        return local and debug

    def get_google_analytics_(self):
        """
        Returns the configuration for Google Analytics.

        Returns:
            str or None: The Google Analytics configuration.
        """
        return self.config_.get('google_analytics', None)

    def get_google_gtag_(self):
        """
        Returns the configured Google global site tag.

        Returns:
            str or None: The configured Google global site tag.
        """
        return self.config_.get('google_gtag', None)

    def get_custom_css_url_(self):
        """
        Returns the URL of the custom CSS file.

        Returns:
            str or None: The URL of the custom CSS file.
        """
        return self.config_.get('custom_css_url', None)

    def get_application_config_(self):
        """
        Reads the application configuration and applies default values.

        Returns:
            dict: The application configuration.
        """
        cfg = self.config_.get('application', {})

        if 'icon' not in cfg:
            cfg.update({
                'icon': self.request_.static_url('oereb_client:static/images/oereb-favicon-48x48.png')
            })

        if 'apple_touch_icon' not in cfg:
            cfg.update({
                'apple_touch_icon': self.request_
                .static_url('oereb_client:static/images/oereb-apple-touch-icon-192x192.png')
            })

        if 'manifest' not in cfg:
            cfg.update({
                'manifest': self.request_.route_url(f'{self.request_.route_prefix}/manifest')
            })

        if 'logo_oereb' not in cfg:
            cfg.update({
                'logo_oereb': [
                    {
                        'Language': 'en',
                        'URL': self.request_.static_url('oereb_client:static/images/logo_oereb_de.jpg')
                    },
                    {
                        'Language': 'de',
                        'URL': self.request_.static_url('oereb_client:static/images/logo_oereb_de.jpg')
                    },
                    {
                        'Language': 'fr',
                        'URL': self.request_.static_url('oereb_client:static/images/logo_oereb_fr.jpg')
                    },
                    {
                        'Language': 'it',
                        'URL': self.request_.static_url('oereb_client:static/images/logo_oereb_it.jpg')
                    },
                    {
                        'Language': 'rm',
                        'URL': self.request_.static_url('oereb_client:static/images/logo_oereb_rm.jpg')
                    }
                ]
            })

        return cfg

    def get_service_url_(self):
        service_url = self.config_.get('service_url', None)
        if service_url is not None:
            if service_url[-1] != '/':
                service_url += '/'
            return service_url
        return self.request_.route_url(f'{self.request_.route_prefix}/index')

    def get_search_url_(self):
        search = self.config_.get('search', None)
        if isinstance(search, str):
            return search
        return self.request_.route_url(f'{self.request_.route_prefix}/search')

    def get_config(self):
        """
        Returns the JSON-encoded configuration.

        Returns:
            str: The JSON-encoded configuration.
        """

        return {
            'test_instance_notice': self.config_.get('test_instance_notice', None),
            'application_url': self.request_.route_url(f'{self.request_.route_prefix}/index'),
            'service_url': self.get_service_url_(),
            'search_url': self.get_search_url_(),
            'application': self.get_application_config_(),
            'version': __version__,
            'view': self.config_.get('view', {}),
            'base_layer': self.config_.get('base_layer', {}),
            'availability': self.config_.get('availability', {}),
            'mask_surrounding': self.config_.get('mask_surrounding'),
            'search': self.config_.get('search', {}),
            'support': self.config_.get('support', {}),
            'external_viewer': self.config_.get('external_viewer', {}),
            'user_guide': self.config_.get('user_guide'),
            'use_tile_wms': self.config_.get('use_tile_wms', False),
            'show_scale_bar': self.config_.get('show_scale_bar', False),
            'enable_rotation': self.config_.get('enable_rotation', True),
            'extract_json_timeout': self.config_.get('extract_json_timeout', 60),
            'extract_pdf_timeout': self.config_.get('extract_pdf_timeout', 120),
            'matomo': self.config_.get('matomo', {})
        }

    def get_title(self):
        title = None
        if 'lang' in self.request_.params:
            for item in self.config_['application']['title']:
                if item['Language'] == self.request_.params.get('lang'):
                    title = item['Text']
                    break
                if item['Language'] == self.config_['application']['default_language']:
                    title = item['Text']
        if title is None:
            title = self.config_['application']['title'][0]['Text']
        return title

    def render(self):
        """
        Returns the dictionary with rendering parameters.

        Returns:
            dict: Dictionary with rendering parameters.
        """
        return {
            'debug': self.is_debug_(),
            'google_analytics': self.get_google_analytics_(),
            'google_gtag': self.get_google_gtag_(),
            'custom_css_url': self.get_custom_css_url_(),
            'config': self.get_config(),
            'title': self.get_title()
        }
