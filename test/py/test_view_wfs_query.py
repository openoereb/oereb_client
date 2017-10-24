# -*- coding: utf-8 -*-
import pytest
from pyramid.httpexceptions import HTTPBadRequest
from oereb_client.views.wfs_query import WfsQuery


def test_provide_wfs_filter(mock_request):
    wfs_query = WfsQuery(mock_request)
    with pytest.raises(HTTPBadRequest):
        wfs_query.provide_wfs_filter()


def test_provide_wfs_filter_with_params(mock_request):
    mock_request.params = {
        'municipality_name': 'Liestal',
        'parcel_number': '1000',
        'layer_name': 'liegenschaft',
        'limit': 5
    }
    wfs_query = WfsQuery(mock_request)
    result = wfs_query.provide_wfs_filter()
    assert isinstance(result, dict)
