# -*- coding: utf-8 -*-
import os
import logging
import yaml
from pyramid.config import Configurator
from pyramid_mako import add_mako_renderer


__version__ = '2.0.0-beta.3'


log = logging.getLogger('oereb_client')


def main(global_config, **settings):  # pragma: no cover
    """
    This function returns a Pyramid WSGI application. This is necessary for development of
    your plugin or if the application is run in a container. It is intended to leave this
    section as is and do configuration in the includeme section only.
    """
    if 'LOG_LEVEL' in os.environ:
        log_level = '{0}'.format(os.environ.get('LOG_LEVEL')).lower()
        if log_level in ['error', 'err']:
            log.setLevel(logging.ERROR)
        elif log_level in ['warning', 'warn']:
            log.setLevel(logging.WARNING)
        elif log_level in ['debug', 'dev', 'development']:
            log.setLevel(logging.DEBUG)

    with open(settings.get('config')) as f:
        yml = yaml.safe_load(f.read())
        settings.update(yml)

    config = Configurator(settings=settings)
    config.include('oereb_client')

    if os.environ.get('DEVELOPMENT') == 'true':
        config.include('samples')
        log.info('RUNNING IN DEVELOPMENT MODE!')

    config.scan()
    return config.make_wsgi_app()


def includeme(config):  # pragma: no cover
    """
    This is the place where you should push all the initial stuff for the plugin
    :param config: The configurator object from the including pyramid module.
    :type geometries: Configurator
    """
    # If you need access to the settings in this part, you can get them via
    # settings = config.get_settings()
    global route_prefix

    config.include('pyramid_mako')

    # bind the mako renderer to other file extensions
    add_mako_renderer(config, ".html")
    add_mako_renderer(config, ".xml")
    add_mako_renderer(config, ".js")

    config.include('oereb_client.routes')

    def get_route_prefix(request):
        return config.route_prefix

    config.add_request_method(get_route_prefix, name='route_prefix', reify=True)
