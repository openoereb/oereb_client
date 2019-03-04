@ngdoc content
@module guide
@name User guide
@description

# User guide

`oereb_client` (OeREB Client) is a web application for the for the Swiss
[“Cadastre of Public-law Restrictions on landownership”](https://www.cadastre.ch/en/oereb.html)
(PLR-cadastre).

It is wrapped into a
[Pyramid](http://docs.pylonsproject.org/projects/pyramid/en/latest/)
plugin and consumes the JSON extract according to the PLR-cadastre
specification. This way, it can be used as front-end for the
[pyramid_oereb](https://openoereb.github.io/pyramid_oereb/doc/) library
with just a few additional configuration steps.
