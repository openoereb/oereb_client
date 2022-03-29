# -*- coding: utf-8 -*-
from samples.views import Sample


def includeme(config):

    # Add sample routes
    config.add_route(f'{config.route_prefix}/getegrid', '/getegrid/json/')
    config.add_view(Sample,
                    attr='get_egrid',
                    route_name=f'{config.route_prefix}/getegrid',
                    renderer='json',
                    request_method='GET')

    config.add_route(f'{config.route_prefix}/getextractbyid', '/extract/json/')
    config.add_view(Sample,
                    attr='get_extract_by_id',
                    route_name=f'{config.route_prefix}/getextractbyid',
                    renderer='json',
                    request_method='GET')

    config.add_route(f'{config.route_prefix}/samplepdf', '/extract/pdf/')
    config.add_view(Sample,
                    attr='get_sample_pdf',
                    route_name=f'{config.route_prefix}/samplepdf',
                    request_method='GET')

    config.add_static_view('samples/static', 'samples:static', cache_max_age=3600)
