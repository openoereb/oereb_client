# -*- coding: utf-8 -*-
import yaml
from pyramid.config import Configurator
from pyramid_mako import add_mako_renderer


__version__ = '1.3.8'


def main(global_config, **settings):  # pragma: no cover
    """
    This function returns a Pyramid WSGI application. This is necessary for development of
    your plugin. So you can run it local with the paster server and in a IDE like PyCharm. It
    is intended to leave this section as is and do configuration in the includeme section only.
    Push additional configuration in this section means it will not be used by the production
    environment at all!
    """
    with open('oereb_client.yml') as f:
        yml = yaml.safe_load(f.read())
    settings.update(yml)
    config = Configurator(settings=settings)
    config.include('oereb_client')
    config.include('samples')
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
