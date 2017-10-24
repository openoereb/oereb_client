# -*- coding: utf-8 -*-

from pyramid.httpexceptions import HTTPBadRequest


class WfsQuery(object):

    def __init__(self, request):
        """Entry point for index rendering.

        Args:
            request (pyramid.request.Request): The request instance.

        """
        self.request_ = request

    def provide_wfs_filter(self):
        if not self.request_.params.get('municipality_name'):
            raise HTTPBadRequest('Parameter "municipality_name" was not set.')

        if not self.request_.params.get('parcel_number'):
            raise HTTPBadRequest('Parameter "parcel_number" was not set.')

        if not self.request_.params.get('limit'):
            raise HTTPBadRequest('Parameter "limit" was not set.')
        if not self.request_.params.get('layer_name'):
            raise HTTPBadRequest('Parameter "layer_name" was not set.')
        return {
            'municipality_name': self.request_.params.get('municipality_name'),
            'parcel_number': self.request_.params.get('parcel_number'),
            'limit': self.request_.params.get('limit'),
            'layer_name': self.request_.params.get('layer_name')
        }
