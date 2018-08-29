# -*- coding: utf-8 -*-
import json

from pyramid.exceptions import ConfigurationError


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
        if application_config.get('logo') is None:
            raise ConfigurationError('Missing application logo')
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

    def get_search_config_(self):
        """Returns the JSON-encoded configuration for the search.

        Returns:
            str: The JSON-encoded search API configuration.

        """
        return json.dumps(self.config_.get('search', {}))

    def get_geo_view_config_(self):
        """Returns the JSON-encoded configuration for the geoViewBL linking.

        Returns:
            str: The JSON-encoded geoViewBL linking configuration.

        """
        return json.dumps(self.config_.get('geo_view', {}))

    def get_support_config_(self):
        """Returns the JSON-encoded configuration for the support.

        Returns:
            str: The JSON-encoded support configuration.

        """
        return json.dumps(self.config_.get('support', {}))

    def render(self):
        """Returns the dictionary with rendering parameters.

        Returns:
            dict: Dictionary with rendering parameters.

        """
        return {
            'title': self.get_application_config_().get('title'),
            'icon': self.get_application_config_().get('icon'),
            'logo': self.get_application_config_().get('logo'),
            'local_storage_prefix': self.get_application_config_().get('local_storage_prefix'),
            'debug': self.is_debug_(),
            'base_layer_config': self.get_base_layer_config_(),
            'availability_config': self.get_availability_config_(),
            'search_api_config': self.get_search_config_(),
            'geo_view_config': self.get_geo_view_config_(),
            'support': self.get_support_config_()
        }
