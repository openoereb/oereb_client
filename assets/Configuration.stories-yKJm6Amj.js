import{M as r}from"./chunk-HLWAVYOI-tMPDmtZb.js";import{j as e}from"./jsx-runtime-xaxriM6s.js";import{u as i}from"./index-EXpe7ZrZ.js";import"./iframe-I-FZaZSb.js";import"../sb-preview/runtime.js";import"./index-NFP2aL9U.js";import"./react-18-89RtvapL.js";import"./index-WO-Izxve.js";import"./chunk-ZGA76URP-PfrU0Dmb.js";import"./pickBy-Eonxbozj.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./mapValues-ZS6BODhJ.js";import"./index-IqZHJlMI.js";import"./index-PPLHz8o0.js";import"./index-Z8kpRV5R.js";function o(t){const n=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",blockquote:"blockquote",strong:"strong",em:"em",pre:"pre",ol:"ol",li:"li",a:"a",h3:"h3",ul:"ul"},i(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"User Guide/Configuration"}),`
`,e.jsx(n.h1,{id:"configuration",children:"Configuration"}),`
`,e.jsxs(n.p,{children:[`Basically, you are free how to configure the OeREB Client. All you need
to do is updating the settings dictionary of the Pyramid configuration.
This dictionary has to be extended with an `,e.jsx(n.code,{children:"oereb_client"}),` element that
contains the parameters described below.`]}),`
`,e.jsx(n.p,{children:`It's recommended to use a YAML file, as described in the next section,
but you don't have to.`}),`
`,e.jsx(n.h2,{id:"update-the-pyramid-configuration",children:"Update the Pyramid configuration"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"}),` This section is not necessary, if the application is run using
the provided container image.`]}),`
`]}),`
`,e.jsxs(n.p,{children:[`In this example, the configuration file for the OeREB Client is named
`,e.jsx(n.code,{children:"oereb_client.yml"}),`. You can create this file in your application's root
directory.`]}),`
`,e.jsxs(n.p,{children:[`The next step is to define this file in your application's INI file. For
example, open the `,e.jsx(n.em,{children:"development.ini"}),` file and add the following line
within the `,e.jsx(n.em,{children:"app:main"})," section:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`oereb_client.cfg = %(here)s/oereb_client.yml
`})}),`
`,e.jsxs(n.p,{children:[`You can call it whatever you want, but it makes sense to use the package
name. You could also use an already existing file, e.g. from
`,e.jsx(n.code,{children:"pyramid_oereb"}),". The variable ",e.jsx(n.code,{children:"%(here)s"}),` stands for the root directory
and will be replaced by its absolute path.`]}),`
`,e.jsxs(n.p,{children:[`As you've now defined, where your configuration file is placed, you can
parse its content. Open the `,e.jsx(n.code,{children:"__init__.py"}),` of your application and apply
the follow changes:`]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Add the required imports at the top of the file."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-python",children:`import codecs
import yaml
`})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsxs(n.li,{children:["Update your ",e.jsx(n.code,{children:"main"}),` method to read and parse the configuration file.
The location of the configuration is available in the existing
settings dictionary (from the INI file). To read the configuration,
it's recommended to use the `,e.jsx(n.code,{children:"codecs"}),` library to avoid errors due to
special characters. The file content gets parsed using the `,e.jsx(n.code,{children:"yaml"}),`
library and directly applied onto the settings dictioinary.`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-python",children:`def main(global_config, **settings):
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
`})}),`
`,e.jsx(n.p,{children:"Now everything is set up to configure the OeREB Client."}),`
`,e.jsx(n.h2,{id:"configure-the-oereb-client",children:"Configure the OeREB Client"}),`
`,e.jsxs(n.p,{children:["Add your configuration in the created ",e.jsx(n.code,{children:"oereb_client.yml"}),` or mount this file into
your container. The top-level element has to be called `,e.jsx(n.code,{children:"oereb_client"}),`. The
following example shows such a configuration and explains the parameters.`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"}),` The configuration file is parsed using
`,e.jsx(n.a,{href:"https://github.com/mkaranasou/pyaml_env",target:"_blank",rel:"nofollow noopener noreferrer",children:"pyaml-env"}),`. This allows you to use
environment variables in your configuration, which will be interpreted when
the configuration is parsed on application start up. Please refer to the
linked project site to see how to use this feature.`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-yaml",children:`# OeREB Client
oereb_client:

  # Global application configuration
  # Mandatory:
  #   - title                 The multilingual application title
  #   - logo_canton           Multilingual URL of the cantonal logo
  #   - languages             List of the available languages
  #   - default_language      The language used as default
  # Optional:
  #   - icon                  URL to image used as favicon
  #   - apple_touch_icon      URL to image used as apple touch icon
  #   - manifest              URL to web app manifest
  #   - logo_oereb            Multilingual URL of the oereb logo
  #   - local_storage_prefix  Prefix used for the local browser storage
  # Logos and Titles have to be provided in each configured language.
  application:
    title:
      - Language: en
        Text: PLR Cadastre
      - Language: de
        Text: ÖREB-Kataster
      - Language: fr
        Text: Cadastre RDPPF
    logo_canton:
      - Language: en
        URL: https://example.com/my_cantonal_logo_en.png
      - Language: de
        URL: https://example.com/my_cantonal_logo_de.png
      - Language: fr
        URL: https://example.com/my_cantonal_logo_fr.png
    languages:
      - en
      - de
      - fr
    default_language: en
    icon: https://example.com/my_favicon_48x48.png
    apple_touch_icon: https://example.com/my_apple_touch_icon_192x192.png
    manifest: https://example.com/my_manifest.json
    logo_oereb:
      - Language: en
        URL: https://example.com/my_oereb_logo_en.png
      - Language: de
        URL: https://example.com/my_oereb_logo_de.png
      - Language: fr
        URL: https://example.com/my_oereb_logo_fr.png
    local_storage_prefix: myPrefix

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
  # https://openlayers.org/en/latest/apidoc/module-ol_source_ImageWMS-ImageWMS.html
  #
  # WMS configuration:
  #   type: wms
  #   url: https://example.com/wms
  #   params:
  #     LAYERS: layer1,layer2
  #     FORMAT: image/png
  #   attributions: optional copyright
  #
  # WMTS configuration:
  #   type: wmts
  #   url: https://example.com/wmts/1.0.0/capabilities.xml
  #   layer: my_base_map
  #   matrixSet: swissgrid
  #   projection: "EPSG:2056"
  #   style: default
  #   format: image/png
  #   attributions: optional copyright
  #
  base_layer:
    type: wmts
    url: https://example.com/wmts/1.0.0/capabilities.xml
    layer: my_base_map
    matrixSet: swissgrid
    projection: "EPSG:2056"
    style: default
    format: image/png
    attributions: Add your copyright here

  # The availability layer can be used to display an overview of the
  # available/published municipalities. You have to define a WMS URL and
  # params according to the ol.source.ImageWMS documentation:
  # https://openlayers.org/en/latest/apidoc/module-ol_source_ImageWMS-ImageWMS.html
  # At least "LAYERS" has to be defined.
  availability:
    url: https://example.com/wms
    params:
      LAYERS: oereb_published_municipalities
      FORMAT: image/png
    attributions: optional copyright or notice

  # Search configuration
  # Specify a list to use the internal search proxy or an URL to use an external endpoint.
  # search: https://my.search-endpoint.ch/
  # Each entry needs a multilingual title. The defined parameters can be used in the URL.
  # The parameter {term} is always available and contains the current search value.
  search:
    - title:
        - Language: en
          Text: E-GRID
        - Language: de
          Text: E-GRID
      url: https://example.com/search?query={prefix}+{term}&limit={limit}
      params:
        limit: 5
        prefix: egr
      hook_method: my.package.hook_egrid
      # Optional parameter to disable certificate verification (enabled by default)
      verify_certificate: False
    - title:
        - Language: en
          Text: Address
        - Language: de
          Text: Adresse
      url: https://example.com/search?query=adr+{term}&limit=5&foo=bar
      hook_method: my.package.hook_address
    - title:
        - Language: en
          Text: Real estate
        - Language: de
          Text: Grundstück
      url: https://example.com/search?query={prefix}+{term}&limit={limit}
      params:
        limit: 5
        prefix: gs
      hook_method: my.package.hook_real_estate

  # Your support address. This will be shown if an error occurs.
  support:
    office1:
      - Language: en
        Text: My Department
      - Language: de
        Text: Meine Direktion
    office2:
      - Language: en
        Text: My Office
      - Language: de
        Text: Meine Dienststelle
    street: Street 1a
    city: 1234 City
    email: support@example.com
    phone: 061 123 45 67

  # [OPTIONAL] Link to external viewer/portal
  # Use this parameter to configure the link to an external viewer or
  # portal. The defined URL gets opened in a new tab. The list of
  # parameters gets joined with "&" and is appended to the URL. You
  # can add special keywords, e.g. "{egrid}", that are replaced by the
  # current values of the real estate and the map. The available
  # keywords are:
  # - map_x             Center of map (X value)
  # - map_y             Center of map (Y value)
  # - map_zoom          Map zoom level
  # - lang              Currently selected language
  # - egrid             EGRID of current real estate
  # - canton            Canton of current extract
  # - fosnr             FOS number of current municipality
  # - identdn           Ident DN of current real estate
  # - municipality      Current municipality name
  # - number            Number of current real estate
  external_viewer:
    tooltip:
      - Language: en
        Text: Go to external viewer
      - Language: de
        Text: zu externem Viewer wechseln
    url: https://my.webgis.com
    params:
      - "egrid={egrid}"
      - "foo=bar"

  # [OPTIONAL] URL of the user guide (website or document).
  # If present, "{lang}" will be replaced with the currenty selected language.
  user_guide: https://example.com/guide/{lang}.pdf

  # [OPTIONAL] Enable tiled WMS requests (default is False)
  use_tile_wms: True

  # [OPTIONAL] Show scale bar (default is False)
  show_scale_bar: True

  # [OPTIONAL] OeREB web service base URL
  # This parameter is only needed, if you are running your OeREB web
  # service in a separate application/container with a different base URL.
  # Do not use this parameter, if you are including the OeREB Client as a
  # plugin in an existing pyramid_oereb instance.
  service_url: https://my.oereb-web-service.ch/

  # [OPTIONAL] Custom CSS file
  # Add the URL to a custom CSS file to adjust styles.
  custom_css_url: https://example.com/mystyle.css

  # [OPTIONAL] Specifiy timeout for extract requests in seconds (Default: 60)
  extract_json_timeout: 60

  # [OPTIONAL] Specifiy timeout for static extract requests seconds (Default: 120)
  extract_pdf_timeout: 120

  # [OPTIONAL] Display a short notice in the user interface.
  # Remove this parameter for production instances.
  test_instance_notice: Development

  # [OPTIONAL] Add Google global site tag. This is requiered for Google Analytics.
  # If undefined, no gtag will be included.
  google_gtag: G-123456789

  # [OPTIONAL] Enable Google Analytics by specifying account key. Leave this
  # parameter undefined to disable Google Analytics.
  google_analytics: UA-12345678-9

  # [OPTIONAL] The mask_surrounding layer can be used to lay a mask (half-transparent
  # white layer) on the surrounding cantons. You have to define a WMS URL and
  # params according to the ol.source.ImageWMS documentation:
  # https://openlayers.org/en/latest/apidoc/module-ol_source_ImageWMS-ImageWMS.html
  # At least "LAYERS" has to be defined.
  # This parameter does not have to be configured.
  mask_surrounding:
    url: https://example.com/wms
    params:
      LAYERS: outside_bl_area
      FORMAT: image/png
    opacity: 0.8
    attributions: optional copyright or notice
`})}),`
`,e.jsx(n.h3,{id:"search",children:"Search"}),`
`,e.jsx(n.p,{children:"As mentioned in the configuration example above, you have two options to configure the search:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"use the integrated search proxy or"}),`
`,e.jsx(n.li,{children:"specify an external endpoint for search requests."}),`
`]}),`
`,e.jsx(n.p,{children:"The client always sends one search request using the following URL pattern, where"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<search url>"})," is the URL of the integrated proxy or the configured external endpoint,"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<search term>"})," the entered search value and"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<language>"})," the currently selected language."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`http(s)://<search url>?term=<search term>&lang=<language>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Use the integrated search proxy"})}),`
`,e.jsx(n.p,{children:`By default, the request described above is sent to the integrated search proxy. The proxy converts
the received request into a single request for each configured search category (E-GRID, address,
real estate, ...). The resulting requests are executed in parallel threads and the results are
aggregated as soon as the last request has finished.`}),`
`,e.jsx(n.p,{children:"To be able to aggregate the results, they have to match the following structure."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`[
  {
    "label": "Search result 1",
    "egrid": "CH1234567890",
    "identdn": "SAMPLE1",
    "number": "1234",
    "coordinates": [2600000.0, 1200000.0]
  },
  {
    "label": "Search result 2",
    "egrid": "CH9876543210",
    "identdn": "SAMPLE2",
    "number": "9876",
    "coordinates": [2600001.0, 1200001.0]
  },
  ...
]
`})}),`
`,e.jsxs(n.p,{children:["Only one of ",e.jsx(n.code,{children:"egrid"}),", ",e.jsx(n.code,{children:"coordinates"})," or ",e.jsx(n.code,{children:"identdn"})," and ",e.jsx(n.code,{children:"number"})," is necessary, whereby using ",e.jsx(n.code,{children:"egrid"}),` should be
the preferred solution.`]}),`
`,e.jsxs(n.p,{children:[`If your configured endpoint for a certain category is not able to return this structure, you can
implement and specify a hook method, which handles the transformation of the results into the
required structure. Please refer to the
`,e.jsx(n.a,{href:"https://github.com/openoereb/oereb_client/blob/main/samples/search.py",target:"_blank",rel:"nofollow noopener noreferrer",children:"samples package"}),` for some
examples on how to implement such a hook method.`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Specify an external endpoint for search requests"})}),`
`,e.jsxs(n.p,{children:["You can bypass the integrated search proxy by setting ",e.jsx(n.code,{children:"search"}),` to an URL of an external search
endpoint. The client will then send each request to the configured URL directly. The external
endpoint needs to accept requests using the pattern described at the beginning of this section.`]}),`
`,e.jsx(n.p,{children:"The returned results need to match the following structure."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`[
  {
    "title": "Address",             // The category title
    "results": [                    // The results of this category
      {
        "label": "Address 1",
        "coordinates": [2600000.0, 1200000.0]
      },
      {
        "label": "Address 2",
        "coordinates": [2600001.0, 1200001.0]
      },
      ...
    ]
  },
  {
    "title": "E-GRID",              // The category title
    "results": [                    // The results of this category
      {
        "label": "CH1234567890",
        "egrid": "CH1234567890"
      },
      {
        "label": "CH9876543210",
        "identdn": "SAMPLE2",
        "number": "9876"
      },
      ...
    ]
  },
  ...
]
`})})]})}function s(t={}){const{wrapper:n}=Object.assign({},i(),t.components);return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}const l=()=>{throw new Error("Docs-only story")};l.parameters={docsOnly:!0};const a={title:"User Guide/Configuration",tags:["stories-mdx"],includeStories:["__page"]};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:s};const T=["__page"];export{T as __namedExportsOrder,l as __page,a as default};
