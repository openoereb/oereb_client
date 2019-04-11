# -*- coding: utf-8 -*-
import json

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

    def get_application_config_(self):
        application_config = self.config_.get('application')
        if not isinstance(application_config, dict):
            raise ConfigurationError('Missing application configuration')
        if application_config.get('title') is None:
            raise ConfigurationError('Missing application title')
        if application_config.get('logo_canton') is None:
            raise ConfigurationError('Missing cantonal logo')
        if application_config.get('logo_oereb') is None:
            raise ConfigurationError('Missing oereb logo')
        return application_config

    def get_base_layer_config_(self):
        """Returns the JSON-encoded configuration for the base layer.

        Returns:
            str: The JSON-encoded base layer configuration.

        """
        base_layer_config = self.config_.get('base_layer', {})
        if not base_layer_config:
            raise ConfigurationError('Missing base layer configuration')
        return json.dumps(base_layer_config)

    def get_availability_config_(self):
        """Returns the JSON-encoded configuration for the availability layer.

        Returns:
            str: The JSON-encoded availability layer configuration.

        """
        availability_layer_config = self.config_.get('availability', {})
        if not availability_layer_config:
            raise ConfigurationError('Missing availability layer configuration')
        return json.dumps(availability_layer_config)

    def get_view_config_(self):
        """Returns the JSON-encoded view configuration.

        Returns:
            str: The JSON-encoded view configuration.

        """
        initial_extent_config = self.config_.get('view', {})
        if not initial_extent_config:
            raise ConfigurationError('Missing view configuration')
        return json.dumps(initial_extent_config)

    def get_search_config_(self):
        """Returns the JSON-encoded configuration for the search.

        Returns:
            str: The JSON-encoded search API configuration.

        """
        return json.dumps(self.config_.get('search', {}))

    def get_external_viewer_config_(self):
        """Returns the JSON-encoded configuration for the external viewer linking.

        Returns:
            str: The JSON-encoded viewer linking configuration.

        """
        return json.dumps(self.config_.get('external_viewer', {}))

    def get_support_config_(self):
        """Returns the JSON-encoded configuration for the support.

        Returns:
            str: The JSON-encoded support configuration.

        """
        return json.dumps(self.config_.get('support', {}))

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

    def render(self):
        """Returns the dictionary with rendering parameters.

        Returns:
            dict: Dictionary with rendering parameters.

        """
        return {
            'version': __version__,
            'title': self.get_application_config_().get('title'),
            'icon': self.get_application_config_().get('icon'),
            'logo_canton': self.get_application_config_().get('logo_canton'),
            'logo_oereb': self.get_application_config_().get('logo_oereb'),
            'local_storage_prefix': self.get_application_config_().get('local_storage_prefix'),
            'debug': self.is_debug_(),
            'view_config': self.get_view_config_(),
            'base_layer_config': self.get_base_layer_config_(),
            'availability_config': self.get_availability_config_(),
            'search_api_config': self.get_search_config_(),
            'external_viewer_config': self.get_external_viewer_config_(),
            'support': self.get_support_config_(),
            'google_analytics': self.get_google_analytics_(),
            'custom_css_url': self.get_custom_css_url_()
        }
