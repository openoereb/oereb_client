# -*- coding: utf-8 -*-
import json

import pytest
from pyramid.config import ConfigurationError
from pyramid.testing import testConfig

from oereb_client import __version__
from oereb_client.views.index import Index


settings = {
    'oereb_client': {
        'application': {
            'title': 'Test',
            'icon': 'http://example.com/favicon.png',
            'logo_canton': 'http://example.com/logo_canton.png',
            'logo_oereb': 'http://example.com/logo_oereb.png',
            'local_storage_prefix': 'bl'
        },
        'view': {
            'map_x': 2615000,
            'map_y': 1255000,
            'map_zoom': 6,
            'resolutions': [1, 2]
        },
        'base_layer': {
            'type': 'wmts',
            'url': 'http://example.com/WMTSCapabilities.xml'
        },
        'availability': {
            'url': 'http://geowms.bl.ch',
            'layer': 'oereb_availability'
        },
        'search': {
            'api': {
                'url': 'http://geoview.bl.ch/main/wsgi/bl_fulltextsearch?',
                'limit': 5
            },
            'wfs': {
                'url': 'http://geowms.bl.ch?',
                'limit': 5
            }
        },
        'external_viewer': {
            'url': 'http://geoview.bl.ch?',
            'params': [
                'param1=foo',
                'param2=bar'
            ]
        },
        'support': {
            'office1': 'Test'
        },
        'google_analytics': 'UA-12345678-9'
    }
}


def test_is_debug(mock_request):
    with testConfig(settings=settings):
        mock_request.set_application_url('http://localhost')
        mock_request.params.update({'debug': 'true'})
        index = Index(mock_request)
        assert index.is_debug_()


def test_is_not_debug(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert not index.is_debug_()


def test_get_base_layer_config(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.get_base_layer_config_() == json.dumps({
            'type': 'wmts',
            'url': 'http://example.com/WMTSCapabilities.xml'
        })


def test_get_availability_config(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.get_availability_config_() == json.dumps({
            'url': 'http://geowms.bl.ch',
            'layer': 'oereb_availability'
        })


def test_get_view_config(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.get_view_config_() == json.dumps({
            'map_x': 2615000,
            'map_y': 1255000,
            'map_zoom': 6,
            'resolutions': [1, 2]
        })


def test_render(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.render() == {
            'version': __version__,
            'title': 'Test',
            'icon': 'http://example.com/favicon.png',
            'logo_canton': 'http://example.com/logo_canton.png',
            'logo_oereb': 'http://example.com/logo_oereb.png',
            'local_storage_prefix': 'bl',
            'debug': index.is_debug_(),
            'view_config': index.get_view_config_(),
            'base_layer_config': index.get_base_layer_config_(),
            'availability_config': index.get_availability_config_(),
            'search_api_config': index.get_search_config_(),
            'external_viewer_config': index.get_external_viewer_config_(),
            'support': index.get_support_config_(),
            'google_analytics': index.get_google_analytics_(),
            'custom_css_url': index.get_custom_css_url_()
        }


def test_get_search_config(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.get_search_config_() == json.dumps(settings.get('oereb_client').get('search'))


def test_get_support_config(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.get_support_config_() == json.dumps(settings.get('oereb_client').get('support'))


def test_get_application_config(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.get_application_config_() == settings.get('oereb_client').get('application')


def test_get_google_analytics(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.get_google_analytics_() == settings.get('oereb_client').get('google_analytics')


def test_get_custom_css_url(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.get_custom_css_url_() == settings.get('oereb_client').get('custom_css_url')


@pytest.mark.parametrize('cfg', [
    None,
    {
        'title': None,
        'logo': 'logo.png'
    },
    {
        'title': 'Test',
        'logo': None
    }
])
def test_get_application_config_fail(cfg, mock_request):
    test_settings = dict(settings).update({
        'application': cfg
    })
    with testConfig(settings=test_settings):
        index = Index(mock_request)
        with pytest.raises(ConfigurationError):
            index.get_application_config_()
