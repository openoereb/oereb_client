# -*- coding: utf-8 -*-
from pyramid.httpexceptions import HTTPNotFound

from oereb_client.views.index import Index
from oereb_client.views.manifest import Manifest
from oereb_client.views.search import Search


def __not_found(request):  # pylint: disable=unused-argument
    """
    Custom view for HTTP 404 (Not Found) exceptions.

    Args:
        request (pyramid.request.Request): The request instance.

    Returns:
        pyramid.httpexceptions.HTTPNotFound: HTTP 404 response.
    """
    return HTTPNotFound()


def includeme(config):
    """
    Route and view definitions used by this application.

    Args:
        config (pyramid.config.Configurator): The application's configuration object.
    """

    # Static views
    config.add_static_view('static', 'oereb_client:static', cache_max_age=3600)

    # index.html
    config.add_route(f'{config.route_prefix}/index', '/')
    config.add_view(Index,
                    attr='render',
                    route_name=f'{config.route_prefix}/index',
                    renderer='oereb_client:templates/index.html',
                    request_method='GET')

    # manifest.json
    if 'manifest' not in config.registry.settings.get('oereb_client', {}).get('application', {}):
        config.add_route(f'{config.route_prefix}/manifest', '/manifest.json')
        config.add_view(Manifest,
                        attr='render',
                        route_name=f'{config.route_prefix}/manifest',
                        renderer='oereb_client:templates/manifest.json',
                        request_method='GET')

    # search
    config.add_route(f'{config.route_prefix}/search', '/search')
    config.add_view(Search,
                    attr='render',
                    route_name=f'{config.route_prefix}/search',
                    renderer='json',
                    request_method='GET')

    # custom exception view
    config.add_notfound_view(__not_found, append_slash=True)

    config.commit()
