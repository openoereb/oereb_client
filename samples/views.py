# -*- coding: utf-8 -*-


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
