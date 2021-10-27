# -*- coding: utf-8 -*-
from samples.views import Sample


def includeme(config):

    # Add sample routes
    config.add_route('{0}/getegrid'.format(config.route_prefix), '/getegrid/json/')
    config.add_view(Sample,
                    attr='get_egrid',
                    route_name='{0}/getegrid'.format(config.route_prefix),
                    renderer='json',
                    request_method='GET')

    config.add_route('{0}/getextractbyid'.format(config.route_prefix),
                     '/extract/json/')
    config.add_view(Sample,
                    attr='get_extract_by_id',
                    route_name='{0}/getextractbyid'.format(config.route_prefix),
                    renderer='json',
                    request_method='GET')

    config.add_route('{0}/samplepdf'.format(config.route_prefix),
                     '/extract/pdf/')
    config.add_view(Sample,
                    attr='get_sample_pdf',
                    route_name='{0}/samplepdf'.format(config.route_prefix),
                    request_method='GET')

    config.add_static_view('samples/static', 'samples:static', cache_max_age=3600)
