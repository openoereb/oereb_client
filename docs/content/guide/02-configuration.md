@ngdoc content
@module guide
@name Configuration
@description

# Configuration

Basically, you are free, how to configure the OeREB Client. All you need
to do, is updating the settings dictionary of the Pyramid configuration.
This dictionary has to be extended with an `oereb_client` element that
contains the parameters described below.

It's recommended to use a YAML file, as described in the next section,
but you don't have to.

## Update the Pyramid configuration

In this example, the configuration file for the OeREB Client is named
`oereb_client.yml`. You can create this file in your application's root
directory.

The next step is to define this file in your application's INI file. For
example, open the *development.ini* file and add the following line
within the *app:main* section:

```
oereb_client.cfg = %(here)s/oereb_client.yml
```

You can call it whatever you want, but it makes sense to use the package
name. You could also use an already existing file, e.g. from
`pyramid_oereb`. The variable `%(here)s` stands for the root directory
and will be replaced by its absolute path.

As you've now defined, where your configuration file is placed, you can
parse its content. Open the `__init__.py` of your application and apply
the follow changes:

1. Add the required imports at the top of the file.
    ```python
    import codecs
    import yaml
    ```
2. Update your `main` method to read and parse the configuration file.
   The location of the configuration is available in the existing
   settings dictionary (from the INI file). To read the configuration,
   it's recommended to use the `codecs` library to avoid errors due to
   special characters. The file content gets parsed using the `yaml`
   library and directly applied onto the settings dictioinary.
    ```python
    def main(global_config, **settings):
        """
        This function returns a Pyramid WSGI application.
        """
        config = Configurator(settings=settings)
        settings = config.get_settings()
        with codecs.open(settings.get('oereb_client.cfg'), encoding='utf-8') as f:
            settings.update(yaml.load(f.read()).get('vars'))
        ...
        config.scan()
        return config.make_wsgi_app()
    ```

Now everything is set up to configure the OeREB Client.

## Configure the OeREB Client

Add your configuration in the created `oereb_client.yml`. The top-level
element has to be called `oereb_client`. The following example shows
such a configuration and explains the parameters.

```yaml
# OeREB Client
oereb_client:

  # Global application configuration.
  # Possible parameters are:
  #   title:                The application title
  #   icon:                 URL of the icon (favicon) to be used
  #   logo_canton:          URL of your cantonal logo
  #   logo_oereb:           URL of the OeREB logo
  #   local_storage_prefix: A prefix to be used for storing values in
  #                         the browser's local storage. (optional)
  application:
    title: My OeREB Client
    icon: https://example.com/favicon.png
    logo_canton: https://example.com/logo_canton.png
    logo_oereb: https://example.com/logo_oereb.png
    local_storage_prefix: oerebClient

  # The view configuration for Openlayers.
  # You can define the default initial extent via the map center (map_x
  # and map_y) and the zoom level (map_zoom).
  # Optionally, you can also restrict the resolutions.
  view:
    map_x: 2615000
    map_y: 1255000
    map_zoom: 2
    resolutions: [250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5, 0.25, 0.1, 0.05, 0.025, 0.01]

  # A base layer has to be defined. You have two options: WMS and WMTS.
  # The "params" attribute in the WMS configuration allows all values
  # according to the ol.source.ImageWMS documentation:
  # https://openlayers.org/en/v4.2.0/apidoc/ol.source.ImageWMS.html
  #
  # WMS configuration:
  #   type: wms
  #   url: https://example.com/wms
  #   params:
  #     LAYERS: layer1,layer2
  #     FORMAT: image/png
  #
  # WMTS configuration:
  #   type: wmts
  #   url: https://example.com/wmts/1.0.0/capabilities.xml
  #   layer: my_base_map
  #   matrixSet: swissgrid
  #   projection: "EPSG:2056"
  #   style: default
  #   format: image/png
  #
  base_layer:
    type: wmts
    url: https://example.com/wmts/1.0.0/capabilities.xml
    layer: my_base_map
    matrixSet: swissgrid
    projection: "EPSG:2056"
    style: default
    format: image/png

  # The availability layer can be used to display an overview of the
  # available/published municipalities. You have to define a WMS URL and
  # a layer name.
  availability:
    url: https://example.com/wms
    layer: oereb_published_municipalities

  # The API used for the search field. The client currently works with
  # the full text search API of GeoMapfish and its WFS. But you could
  # replace it by any other service that returns the same format
  # (GeoJSON).
  search:
    api:
      url: https://my.geomapfish.com/wsgi/bl_fulltextsearch
      limit: 5
    wfs:
      url: https://my.geomapfish.com/wsgi/mapserv_proxy
      limit: 5

  # Your support address. This will be shown if an error occurs.
  support:
    office1: My Department
    office2: My Office
    street: Street 1a
    city: 1234 City
    email: support@example.com
    phone: 061 123 45 67
```
