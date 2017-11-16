# -*- coding: utf-8 -*-
import json

import time
from pyramid.httpexceptions import HTTPOk


class Sample(object):
    def __init__(self, request):
        self.request_ = request

    def get_egrid(self):
        time.sleep(2)
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
        time.sleep(2)
        with open('samples/extract.json') as f:
            content = json.loads(f.read())
        return HTTPOk(json_body=content)

    def get_sample_pdf(self):
        with open('samples/static/sample.pdf', 'rb') as f:
            content = f.read()
        response = self.request_.response
        response.status_int = 200
        response.content_type = 'application/pdf'
        response.body = content
        return response
