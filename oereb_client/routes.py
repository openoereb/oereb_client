# -*- coding: utf-8 -*-
from oereb_client.views.wfs_query import WfsQuery
from oereb_client.views.deps import Depswriter
from oereb_client.views.index import Index


def includeme(config):  # pragma: no cover
    """Route and view definitions used by this application.

    Args:
        config (pyramid.config.Configurator): The application's configuration object.

    """

    # Static views
    config.add_static_view('static', 'oereb_client:static', cache_max_age=3600)
    config.add_static_view('node_modules', 'oereb_client:../node_modules', cache_max_age=3600)

    # index.html
    config.add_route('{0}/index'.format(config.route_prefix), '/')
    config.add_view(Index,
                    attr='render',
                    route_name='{0}/index'.format(config.route_prefix),
                    renderer='oereb_client:templates/index.html',
                    request_method='GET')

    # deps.js
    config.add_route('{0}/deps.js'.format(config.route_prefix), '/deps.js')
    config.add_view(Depswriter,
                    attr='render',
                    route_name='{0}/deps.js'.format(config.route_prefix),
                    request_method='GET')

    # wfs_query.xml
    config.add_route('{0}/wfs_filter'.format(config.route_prefix), '/wfs_filter.xml')
    config.add_view(WfsQuery,
                    attr='provide_wfs_filter',
                    route_name='{0}/wfs_filter'.format(config.route_prefix),
                    renderer='oereb_client:templates/wfs_filter.xml',
                    request_method='GET')

    config.commit()
