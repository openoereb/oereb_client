# -*- coding: utf-8 -*-
from pyramid.testing import testConfig

from oereb_client.views.manifest import Manifest


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
            'languages': ['en', 'de'],
            'default_language': 'en'
        }
    }
}


def test_render(mock_request):
    with testConfig(settings=settings) as config:
        config.route_prefix = None
        config.add_route('{0}/index'.format(config.route_prefix), '/')
        manifest = Manifest(mock_request)
        assert manifest.render() == {
            'name': 'Test1',
            'start_url': 'http://example.com/'
        }
