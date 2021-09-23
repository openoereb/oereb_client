# -*- coding: utf-8 -*-
import pytest
from pyramid.testing import DummyRequest


class MockRequest(DummyRequest):

    route_prefix = None

    def __init__(self, **kwargs):
        super(MockRequest, self).__init__(**kwargs)
        self.scheme_ = 'http'

    def set_application_url(self, url):
        self.application_url = url

    def set_scheme(self, scheme):
        self.scheme_ = scheme

    @property
    def scheme(self):
        return self.scheme_


@pytest.fixture
def mock_request():
    return MockRequest()
