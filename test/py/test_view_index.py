# -*- coding: utf-8 -*-
import json

import pytest
from pyramid.testing import testConfig

from oereb_client.views.index import Index


settings = {
    'oereb_client': {
        'base_layer': {
            'type': 'wmts',
            'http': 'http://example.com/WMTSCapabilities.xml'
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


@pytest.mark.parametrize('scheme,intranet,cfg', [
    ('http', None, {
        'oereb_client': {
            'base_layer': {
                'type': 'wmts',
                'http': 'http://example.com/WMTSCapabilities.xml'
            }
        }
    }),
    ('https', None, {
        'oereb_client': {
            'base_layer': {
                'type': 'wmts',
                'https': 'http://example.com/WMTSCapabilities.xml'
            }
        }
    }),
    ('https', '1', {
        'oereb_client': {
            'base_layer': {
                'type': 'wmts',
                'intranet': 'http://example.com/WMTSCapabilities.xml'
            }
        }
    })
])
def test_get_base_layer_url(scheme, intranet, cfg, mock_request):
    mock_request.set_scheme(scheme)
    mock_request.environ['intranet'] = intranet
    with testConfig(settings=cfg):
        index = Index(mock_request)
        assert index.get_base_layer_url_() == 'http://example.com/WMTSCapabilities.xml'


def test_get_base_layer_config(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.get_base_layer_config_() == json.dumps({
            'type': 'wmts',
            'url': 'http://example.com/WMTSCapabilities.xml'
        })


def test_render(mock_request):
    with testConfig(settings=settings):
        index = Index(mock_request)
        assert index.render() == {
            'debug': index.is_debug_(),
            'base_layer_config': index.get_base_layer_config_()
        }
