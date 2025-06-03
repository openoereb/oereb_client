Changelog
---------

2.3.0
*****

https://github.com/openoereb/oereb_client/milestone/18

- Fix visibility of rotation control
- Add option to enable/disable map rotation
- Dependency updates

2.2.0
*****

https://github.com/openoereb/oereb_client/milestone/17

- Include Matomo JavaScript Client
- Fix broken links in docs
- Update Alpine version in container images
- Dependency updates
- Drop support for Python 3.8

2.1.3
*****

https://github.com/openoereb/oereb_client/milestone/16

- Set Python 3.11 as default
- Fix layout for list of concerned themes

2.1.2
*****

https://github.com/openoereb/oereb_client/milestone/15

- Improve translations
- Dependency updates

2.1.1
*****

https://github.com/openoereb/oereb_client/milestone/14

- Small fixes in UI

2.1.0
*****

https://github.com/openoereb/oereb_client/milestone/13

- URL for responsible office is now optional
- Show message in user interface, if "getegrid" returns no results
- Add option to hide real estate highlight
- Add option to hide background map
- Add option to show scale bar
- Add web app manifest and icons
- Update node version
- Update to React 18
- Apply new React root API
- Replace Enzyme with React Testing Library
- Replace Webpack with Vite
- Drop support for Python 3.7

2.0.5
*****

https://github.com/openoereb/oereb_client/milestone/12

- Add option for Google global site tag

2.0.4
*****

https://github.com/openoereb/oereb_client/milestone/11

- Fix trigger for zoom on legend symbols

2.0.3
*****

https://github.com/openoereb/oereb_client/milestone/10

- Fix optional parameter mask_surrounding

2.0.2
*****

https://github.com/openoereb/oereb_client/milestone/9

- Remove border for legend symbols
- Adapt static extract layout for legend items
- Dependency updates

2.0.1
*****

https://github.com/openoereb/oereb_client/milestone/8

- Fix typo in french translation
- Add configurable user guide button
- Add mask layer
- Add support for IDENTDN and NUMBER

2.0.0
*****

https://github.com/openoereb/oereb_client/milestone/7

- Display municipality name at the bottom of its logo
- Add configurable attributions for base layers
- Enable "append_slash" for routes
- Add loading indicator for WMS requests
- Show real estate type in map query results and extract

2.0.0-beta.4
************

https://github.com/openoereb/oereb_client/milestone/6

- Fix layer order in OpenLayers
- Configurable timeout for extract requests
- Replace grequests with requests-futures
- Fix rendering of subthemes
- Fix sorting of documents
- Drop support for Python 3.6
- Sort legend entries
- Use pyaml-env to parse the configuration
- Fix legend for different geometries with same type code
- Reverse history elements
- Fix legend layout
- Dependency updates

2.0.0-beta.3
************

https://github.com/openoereb/oereb_client/milestone/5

- Concerned themes are expanded by default
- Fix WFS request encoding in search samples
- Fix URL for static extract request
- Fix loading indicator staying visible in map
- Fix error on real estate without restriction
- Respect specified layer opacity
- Remove support for LV03 coordinates in search

2.0.0-beta.2
************

https://github.com/openoereb/oereb_client/milestone/4

- Add configurable notice for test instances
- Respect sub theme for grouping restrictions
- Fix handling for official numbers
- Use ImageWMS by default
- Improved topic titles

2.0.0-beta.1
************

https://github.com/openoereb/oereb_client/milestone/2

- Drop support for Python 2.7 and 3.5
- Application re-design
- Configurable search
- Add support for multiple languages
- Update Bootstrap and Openlayers
- Use React-redux instead of AngularJS
- Use Jest instead of Karma
- Use Webpack instead of Closure Compiler
- Fix duplicate workflow runs
- Dependency updates
- Provide Docker Image to run the application
- Update documentation using Storybook

1.3.8
*****

https://github.com/openoereb/oereb_client/milestone/3

- Fix missing artifacts for deployment
- Dependency updates

1.3.7
*****

https://github.com/openoereb/oereb_client/milestone/1

- Move project to https://github.com/openoereb/oereb_client
- Customizable E-GRID style
- Dependency updates

1.3.6
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/24

- Add optional property "egrid" in search results

1.3.5
*****

https://gitlab.com/gf-bl/oereb/oereb_client/milestones/23

- Use absolute imports to fix Python 3 compatibility

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
