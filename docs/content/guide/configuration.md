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

You can call it whatever you want, but it make sense to use the package
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
