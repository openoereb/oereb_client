Changelog
---------

1.3.4
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/22

- Fix unique search results

1.3.3
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/21

- Fix sorting of legend entries
- Fix search handling on multiple results for one EGRID
- Print 0.0% values in legend
- Define timeout for extract requests

1.3.2
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/20

- Configurable tooltip for link to external viewer

1.3.1
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/19

- Parse format parameter from view service URL
- Add configurable custom CSS file

1.3.0
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/18

- Move repository into oereb subgroup
- Update URLs in documentation
- Configurable parameters for availability layer
- Configurable link to WebGIS
- Add configuration for Google Analytics

1.2.5
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/17

- Improve layout for responsible offices
- Improve sorting of glossary

1.2.4
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/16

- Adjust legend titles according to PDF specification
- Add responsible offices from geometries
- Specify OEREB logo via configuration

1.2.3
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/15

- Allow extracts without restrictions (e.g. in unpublished municipalities)
- Define ol.View resolutions via configuration
- Round zoom level value in URL
- Rename "Glossar" to "Abkürzungen"
- Include abbreviation and official number in document title, if available

1.2.2
*****

- Fix broken package on PyPI

1.2.1
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/14

- Reject extract if restriction contains no legal provisions
- Use new getegrid URL (with format parameter)
- Update map center and zoom level in URL parameters
- Use URL parameters to specify initial extent

1.2.0
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/13

- Build and upload tagged versions to public PyPI
- Set title and favicon via configuration
- Set logo URL via configuration
- Show link to GeoView BL only if configured
- Apply new property names in legend
- Adapt new document types
- Add section for hints
- Add magnifier for legend symbols (with on/off switch)

1.1.5
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/12

- dismiss all non https urls for WMTS


1.1.4
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/11

- Fix URL encoding in link to GeoView BL

1.1.3
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/10

- Configure GeoView BL layers via YAML

1.1.2
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/9

- Fix PDF download on iOS
- Combine built JavaScript code in one file

1.1.1
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/8

- Fix search results in IE
  (https://gitlab.com/gf-bl/oereb/oereb_client/issues/67)
- Hide expand button on new extract
  (https://gitlab.com/gf-bl/oereb/oereb_client/issues/66)
- Show availability map on top of topic layers
  (https://gitlab.com/gf-bl/oereb/oereb_client/issues/68)
- Fix error message content and visibility in IE
- Adjust information panel font size on small screens
- Add fade out at top and bottom of extract wrapper
  (not working with IE)
- Add missing tool tips
  (https://gitlab.com/gf-bl/oereb/oereb_client/issues/69)
- Add cache buster to HTTP requests
  (https://gitlab.com/gf-bl/oereb/oereb_client/issues/70)

1.1.0
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/7

- Optimize user interface for mobile devices
- Add availability map
- Chronological sorting of history items
- Adjust padding in fit method for mobile layout
- Fix width of full legend graphics in IE

1.0.0
*****

- Initial version
