# -*- coding: utf-8 -*-
import httpretty
import json

from grequests import AsyncRequest
from pyramid.testing import testConfig

from oereb_client.views import get_localized_text
from oereb_client.views.search import Search


settings = {
    'oereb_client': {
        'application': {
            'languages': ['en', 'de'],
            'default_language': 'en'
        },
        'search': [
            {
                'title': [
                    {
                        'Language': 'en',
                        'Text': 'E-GRID'
                    }
                ],
                'url': 'https://example.com/search?query={prefix}+{term}&limit={limit}',
                'params': {
                    'limit': 5,
                    'prefix': 'egr'
                }
            }
        ]
    }
}


def hook_test(config, response, lang, default_lang):
    if len(response.get('features')) < 1:
        return None

    results = []

    for result in response.get('features'):
        results.append({
            'label': result.get('properties').get('label'),
            'egrid': result.get('properties').get('egrid')
        })

    return {
        'title': get_localized_text(config.get('title'), lang, default_lang),
        'results': results
    }


def test_init(mock_request):
    with testConfig(settings=settings):
        search = Search(mock_request)
        assert search.request_ == mock_request
        assert search.config_ == settings.get('oereb_client')
        assert search.lang_ == 'en'
        assert search.default_lang_ == 'en'


def test_init_with_language(mock_request):
    with testConfig(settings=settings):
        mock_request.params.update({'lang': 'de'})
        search = Search(mock_request)
        assert search.request_ == mock_request
        assert search.config_ == settings.get('oereb_client')
        assert search.lang_ == 'de'
        assert search.default_lang_ == 'en'


def test_create_request(mock_request):
    with testConfig(settings=settings):
        search = Search(mock_request)
        req = search.create_request_(settings.get('oereb_client').get('search')[0], 'abc')
        assert isinstance(req, AsyncRequest)
        assert req.method == 'GET'
        assert req.url == 'https://example.com/search?query=egr+abc&limit=5'
        assert req.kwargs.get('timeout') == 1


@httpretty.activate
def test_send_requests(mock_request):
    httpretty.register_uri(
        httpretty.GET,
        'https://example.com/search?query=egr+foo&limit=5',
        body='bar'
    )
    with testConfig(settings=settings):
        mock_request.params.update({'term': 'foo'})
        search = Search(mock_request)
        results = search.send_requests_()
        assert isinstance(results, list)
        assert len(results) == 1
        assert results[0].text == 'bar'


@httpretty.activate
def test_render(mock_request):
    response_text = {
        'title': 'E-GRID',
        'results': [
            {
                'label': 'Test',
                'egrid': 'CH1234567890'
            }
        ]
    }
    httpretty.register_uri(
        httpretty.GET,
        'https://example.com/search?query=egr+foo&limit=5',
        body=json.dumps(response_text)
    )
    with testConfig(settings=settings):
        mock_request.params.update({'term': 'foo'})
        search = Search(mock_request)
        assert search.render() == [response_text]
