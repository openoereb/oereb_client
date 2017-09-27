# -*- coding: utf-8 -*-
import pytest
from pyramid.testing import DummyRequest


class MockRequest(DummyRequest):
    def __init__(self, **kwargs):
        super(MockRequest, self).__init__(**kwargs)

    def set_application_url(self, url):
        self.application_url = url


@pytest.fixture
def mock_request():
    return MockRequest()
