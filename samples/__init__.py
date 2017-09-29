# -*- coding: utf-8 -*-
from samples.views import Sample


def includeme(config):

    # Add sample routes
    config.add_route('{0}/getegrid'.format(config.route_prefix), '/getegrid.json')
    config.add_view(Sample,
                    attr='get_egrid',
                    route_name='{0}/getegrid'.format(config.route_prefix),
                    renderer='json',
                    request_method='GET')
