# -*- coding: utf-8 -*-
import pytest
from pyramid.httpexceptions import HTTPNotFound

from oereb_client.views.deps import Depswriter


def test_not_found(mock_request):
    with pytest.raises(HTTPNotFound):
        Depswriter(mock_request)


def test_get_params(mock_request):
    mock_request.set_application_url('http://localhost')
    depswriter = Depswriter(mock_request)
    params = depswriter.get_params_()
    assert isinstance(params, str)
    assert params.startswith('--root_with_prefix')
    assert params.endswith('goog"')
