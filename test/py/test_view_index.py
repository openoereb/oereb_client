# -*- coding: utf-8 -*-
import json

from pyramid.testing import testConfig

from oereb_client.views.index import Index


settings = {
    'oereb_client': {
        'base_layer': {
            'type': 'wmts'
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
        assert index.get_base_layer_config_() == json.dumps(settings.get('oereb_client').get('base_layer'))


def test_render(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.render() == {
            'debug': index.is_debug_(),
            'base_layer_config': index.get_base_layer_config_(),
            'search_api_config': index.get_search_config_()
        }


def test_get_search_config(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.get_search_config_() == json.dumps(settings.get('oereb_client').get('search'))
