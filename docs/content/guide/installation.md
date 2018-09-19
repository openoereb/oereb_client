@ngdoc content
@module guide
@name Installation
@description

# Installation

Please use the following instructions to install the OeREB Client. The
code samples are based on a Linux system but may be adapted for
Windows environments.

> **Note:** The usage of a virtual environment is recommended but not
necessary. For the examples, a virtual environment under ".venv" is
assumed.

## Requirements

As the OeREB Client is designed as a plugin for the
[Pyramid Web Framework](http://docs.pylonsproject.org/projects/pyramid/en/latest/),
you need an existing Pyramid application. If you don't already have one,
please follow the instructions in the Pyramid documentation to set up
the application.

To make use of the front-end application, you also need a back-end part.
For that, you can include
[pyramid_oereb](https://camptocamp.github.io/pyramid_oereb/doc/) in the
same Pyramid application, for example.

Having all set up, you can proceed with installation of the OeREB
Client.

## Download the package

The OeREB Client is available as a
[Python package](https://pypi.org/project/oereb-client/) on the Python
Package Index (PyPI). The recommended way is to install it from there
using `pip`.

```console
.venv/bin/pip install oereb_client
```

If you want to install a certain version of the package, you can
specifiy it. For example:

```console
.venv/bin/pip install oereb_client==1.0.0
```

> **NOTE:** Use the latest release as long as there is no need for a
certain version.

Alternatively, you could add `oereb_client` to a file, like
*requirements.txt* and use it for downloading:

```console
.venv/bin/pip install -r requirements.txt
```

## Include the plugin
