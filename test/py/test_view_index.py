# -*- coding: utf-8 -*-
import json

import pytest
from pyramid.config import ConfigurationError
from pyramid.testing import testConfig

from oereb_client.views.index import Index


settings = {
    'oereb_client': {
        'application': {
            'title': 'Test',
            'icon': 'http://example.com/favicon.png',
            'logo': 'http://example.com/logo.png',
            'local_storage_prefix': 'bl'
        },
        'initial_extent': {
            'map_x': 2615000,
            'map_y': 1255000,
            'map_zoom': 6
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
        'geo_view': {
            'url': 'http://geoview.bl.ch?'
        },
        'support': {
            'office1': 'Test'
        }
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


def test_get_initial_extent_config(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.get_initial_extent_config_() == json.dumps({
            'map_x': 2615000,
            'map_y': 1255000,
            'map_zoom': 6
        })


def test_render(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.render() == {
            'title': 'Test',
            'icon': 'http://example.com/favicon.png',
            'logo': 'http://example.com/logo.png',
            'local_storage_prefix': 'bl',
            'debug': index.is_debug_(),
            'initial_extent_config': index.get_initial_extent_config_(),
            'base_layer_config': index.get_base_layer_config_(),
            'availability_config': index.get_availability_config_(),
            'search_api_config': index.get_search_config_(),
            'geo_view_config': index.get_geo_view_config_(),
            'support': index.get_support_config_()
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
