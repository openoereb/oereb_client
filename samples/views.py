# -*- coding: utf-8 -*-
import json
import time
import pkg_resources

from pyramid.httpexceptions import HTTPBadRequest, HTTPOk, HTTPServerError


class Sample(object):
    def __init__(self, request):
        """
        Entry point for sample rendering.

        Args:
            request (pyramid.request.Request): The request instance.
        """
        self._request = request

    def get_egrid(self):
        if 'EN' in self._request.params:
            time.sleep(2)
            return {
                'GetEGRIDResponse': [
                    {
                        'egrid': 'CH0815',
                        'number': '0815',
                        'identDN': 'SAMPLE1',
                        'type': {
                            'Code': 'Distinct_and_permanent_rights.BuildingRight',
                            'Text': [
                                {
                                    'Language': 'de',
                                    'Text': 'Baurecht'
                                },
                                {
                                    'Language': 'fr',
                                    'Text': 'Droit de superficie'
                                },
                                {
                                    'Language': 'it',
                                    'Text': 'Diritto di superficie'
                                },
                                {
                                    'Language': 'rm',
                                    'Text': 'Dretg da construcziun'
                                },
                                {
                                    'Language': 'en',
                                    'Text': 'Building right'
                                }
                            ]
                        }
                    },
                    {
                        'egrid': 'CH1234',
                        'number': '1234',
                        'identDN': 'SAMPLE2',
                        'type': {
                            'Code': 'RealEstate',
                            'Text': [
                                {
                                    'Language': 'de',
                                    'Text': 'Liegenschaft'
                                },
                                {
                                    'Language': 'fr',
                                    'Text': 'Bien-fonds'
                                },
                                {
                                    'Language': 'it',
                                    'Text': 'Bene immobile'
                                },
                                {
                                    'Language': 'rm',
                                    'Text': 'Bain immobigliar'
                                },
                                {
                                    'Language': 'en',
                                    'Text': 'Property'
                                }
                            ]
                        }
                    }
                ]
            }
        else:
            return HTTPBadRequest()

    def get_extract_by_id(self):
        time.sleep(2)
        if self._request.params.get('EGRID') == 'CH1234':
            with open(pkg_resources.resource_filename('samples', 'extract.json')) as f:
                content = json.loads(f.read())
            return HTTPOk(json_body=content)
        return HTTPServerError('An error occurred.')

    def get_sample_pdf(self):
        time.sleep(2)
        with open(pkg_resources.resource_filename('samples', 'static/sample.pdf'), 'rb') as f:
            content = f.read()
        response = self._request.response
        response.status_int = 200
        response.content_type = 'application/pdf'
        response.body = content
        return response
