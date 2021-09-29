# -*- coding: utf-8 -*-
import pytest

from oereb_client.views import get_localized_text


multilingual_sample = [
    {
        'Language': 'en',
        'Text': 'English'
    },
    {
        'Language': 'de',
        'Text': 'German'
    },
    {
        'Language': 'fr',
        'Text': 'French'
    }
]


@pytest.mark.parametrize('multilingual_text,language,default_language,result', [
    (multilingual_sample, 'en', 'en', 'English'),
    (multilingual_sample, 'de', 'en', 'German'),
    (multilingual_sample, 'fr', 'en', 'French'),
    (multilingual_sample, 'it', 'de', 'German'),
    (multilingual_sample, 'it', 'rm', 'English')
])
def test_get_localized_text(multilingual_text, language, default_language, result):
    assert get_localized_text(multilingual_text, language, default_language) == result
