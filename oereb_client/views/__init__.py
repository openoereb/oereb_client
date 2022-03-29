"""OeREB Client views."""
# -*- coding: utf-8 -*-


def get_localized_text(multilingual_text, language, default_language):
    """Return localized text from multilingual element."""
    if not isinstance(multilingual_text, list):
        return multilingual_text
    text = None
    for item in multilingual_text:
        if item['Language'] == language:
            return item['Text']
        if item['Language'] == default_language:
            text = item['Text']
    if text is not None:
        return text
    return multilingual_text[0]['Text']
