# -*- coding: utf-8 -*-
from oereb_client.views.index import Index
from oereb_client.views.search import Search


def includeme(config):
    """Route and view definitions used by this application.

    Args:
        config (pyramid.config.Configurator): The application's configuration object.

    """

    # Static views
    config.add_static_view('static', 'oereb_client:static', cache_max_age=3600)

    # index.html
    config.add_route('{0}/index'.format(config.route_prefix), '/')
    config.add_view(Index,
                    attr='render',
                    route_name='{0}/index'.format(config.route_prefix),
                    renderer='oereb_client:templates/index.html',
                    request_method='GET')

    # search
    config.add_route('{0}/search'.format(config.route_prefix), '/search')
    config.add_view(Search,
                    attr='render',
                    route_name='{0}/search'.format(config.route_prefix),
                    renderer='json',
                    request_method='GET')

    config.commit()
