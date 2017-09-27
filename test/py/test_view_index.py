# -*- coding: utf-8 -*-
from oereb_client.views.index import Index


def test_is_debug(mock_request):
    mock_request.set_application_url('http://localhost')
    mock_request.params.update({'debug': 'true'})
    index = Index(mock_request)
    assert index.is_debug_()


def test_is_not_debug(mock_request):
    index = Index(mock_request)
    assert not index.is_debug_()


def test_render(mock_request):
    index = Index(mock_request)
    assert index.render() == {
        'debug': index.is_debug_()
    }
