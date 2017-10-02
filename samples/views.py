# -*- coding: utf-8 -*-
import json

from pyramid.httpexceptions import HTTPOk


class Sample(object):
    def __init__(self, request):
        self.request_ = request

    def get_egrid(self):
        return {
            'GetEGRIDResponse': [
                {
                    'egrid': 'CH0815',
                    'number': '0815',
                    'identDN': 'SAMPLE'
                },
                {
                    'egrid': 'CH1234',
                    'number': '1234',
                    'identDN': 'SAMPLE'
                }
            ]
        }

    def get_extract_by_id(self):
        with open('samples/extract.json') as f:
            content = json.loads(f.read())
        return HTTPOk(json_body=content)
