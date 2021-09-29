# -*- coding: utf-8 -*-
import pytest
from copy import deepcopy
from pyramid.config import ConfigurationError
from pyramid.testing import testConfig

from oereb_client import __version__
from oereb_client.views.index import Index


def remove_key(d, key, sub_key=None):
    c = deepcopy(d)
    if sub_key:
        c.get('oereb_client').get(key).pop(sub_key)
    else:
        c.get('oereb_client').pop(key)
    return c


search_url = 'https://geoview.bl.ch/main/wsgi/bl_fulltextsearch?query={prefix}+{term}&limit={limit}'
settings = {
    'oereb_client': {
        'application': {
            'title': [
                {
                    'Language': 'en',
                    'Text': 'Test1'
                },
                {
                    'Language': 'de',
                    'Text': 'Test2'
                }
            ],
            'icon': 'http://example.com/favicon.png',
            'logo_canton': 'http://example.com/logo_canton.png',
            'logo_oereb': 'http://example.com/logo_oereb.png',
            'local_storage_prefix': 'bl',
            'languages': ['en', 'de'],
            'default_language': 'en'
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
        'search': [
            {
                'title': [
                    {
                        'Language': 'en',
                        'Text': 'E-GRID'
                    }
                ],
                'url': search_url,
                'params': {
                    'limit': 5,
                    'prefix': 'egr'
                },
                'hook_method': 'samples.search.hook_egrid'
            }
        ],
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


def test_render(mock_request):
    with testConfig(settings=settings) as config:
        config.route_prefix = None
        config.add_route('{0}/index'.format(config.route_prefix), '/')
        index = Index(mock_request)
        assert index.render() == {
            'debug': index.is_debug_(),
            'google_analytics': index.get_google_analytics_(),
            'custom_css_url': index.get_custom_css_url_(),
            'config': index.get_config(),
            'title': index.get_title()
        }


def test_get_config(mock_request):
    with testConfig(settings=settings) as config:
        config.route_prefix = None
        config.add_route('{0}/index'.format(config.route_prefix), '/')
        index = Index(mock_request)
        assert index.get_config() == {
            'application_url': 'http://example.com/',
            'application': settings.get('oereb_client').get('application'),
            'version': __version__,
            'view': settings.get('oereb_client').get('view'),
            'base_layer': settings.get('oereb_client').get('base_layer'),
            'availability': settings.get('oereb_client').get('availability'),
            'search': settings.get('oereb_client').get('search'),
            'support': settings.get('oereb_client').get('support'),
            'external_viewer': settings.get('oereb_client').get('external_viewer')
        }


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
    remove_key(settings, 'application'),
    remove_key(settings, 'application', 'title'),
    remove_key(settings, 'application', 'logo_canton'),
    remove_key(settings, 'application', 'logo_oereb'),
    remove_key(settings, 'view'),
    remove_key(settings, 'view', 'map_x'),
    remove_key(settings, 'view', 'map_y'),
    remove_key(settings, 'view', 'map_zoom'),
    remove_key(settings, 'view', 'resolutions'),
    remove_key(settings, 'base_layer'),
    remove_key(settings, 'availability'),
    remove_key(settings, 'search'),
    remove_key(settings, 'support')
])
def test_get_application_config_fail(cfg, mock_request):
    with testConfig(settings=cfg):
        with pytest.raises(ConfigurationError):
            Index(mock_request)


def test_get_title_default_language(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.get_title() == 'Test1'


def test_get_title_specified_language(mock_request):
    with testConfig(settings=settings):
        mock_request.params.update({
            'lang': 'de'
        })
        index = Index(mock_request)
        assert index.get_title() == 'Test2'
