import{M as a}from"./chunk-HLWAVYOI-tMPDmtZb.js";import{j as e}from"./jsx-runtime-xaxriM6s.js";import{u as r}from"./index-EXpe7ZrZ.js";import"./iframe-I-FZaZSb.js";import"../sb-preview/runtime.js";import"./index-NFP2aL9U.js";import"./react-18-89RtvapL.js";import"./index-WO-Izxve.js";import"./chunk-ZGA76URP-PfrU0Dmb.js";import"./pickBy-Eonxbozj.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./mapValues-ZS6BODhJ.js";import"./index-IqZHJlMI.js";import"./index-PPLHz8o0.js";import"./index-Z8kpRV5R.js";function t(i){const n=Object.assign({h1:"h1",p:"p",blockquote:"blockquote",strong:"strong",h2:"h2",a:"a",code:"code",pre:"pre",em:"em",h3:"h3"},r(),i.components);return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"User Guide/Installation"}),`
`,e.jsx(n.h1,{id:"installation",children:"Installation"}),`
`,e.jsx(n.p,{children:`Please use the following instructions to install the OeREB Client. The
code samples are based on a Linux system but may be adapted for
Windows environments.`}),`
`,e.jsx(n.p,{children:`If you want to use the provided container image to run the application,
please refer to the last section of this page.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"}),` The usage of a virtual environment is recommended but not
necessary. For the examples, a virtual environment under ".venv" is
assumed.`]}),`
`]}),`
`,e.jsx(n.h2,{id:"requirements",children:"Requirements"}),`
`,e.jsxs(n.p,{children:[`As the OeREB Client is designed as a plugin for the
`,e.jsx(n.a,{href:"http://docs.pylonsproject.org/projects/pyramid/en/latest/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Pyramid Web Framework"}),`,
you need an existing Pyramid application. If you don't already have one,
please follow the instructions in the Pyramid documentation to set up
the application.`]}),`
`,e.jsxs(n.p,{children:[`To make use of the front-end application, you also need a back-end part.
For that, you can include
`,e.jsx(n.a,{href:"https://openoereb.github.io/pyramid_oereb/doc/",target:"_blank",rel:"nofollow noopener noreferrer",children:"pyramid_oereb"}),` in the
same Pyramid application, for example.`]}),`
`,e.jsx(n.p,{children:`Having all set up, you can proceed with installation of the OeREB
Client.`}),`
`,e.jsx(n.h2,{id:"download-the-package",children:"Download the package"}),`
`,e.jsxs(n.p,{children:[`The OeREB Client is available as a
`,e.jsx(n.a,{href:"https://pypi.org/project/oereb-client/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Python package"}),` on the Python
Package Index (PyPI). The recommended way is to install it from there
using `,e.jsx(n.code,{children:"pip"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-console",children:`.venv/bin/pip install oereb_client
`})}),`
`,e.jsx(n.p,{children:`If you want to install a certain version of the package, you can
specifiy it. For example:`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-console",children:`.venv/bin/pip install oereb_client==2.0.6
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"NOTE:"}),` Use the latest release as long as there is no need for a
certain version.`]}),`
`]}),`
`,e.jsxs(n.p,{children:["Alternatively, you could add ",e.jsx(n.code,{children:"oereb_client"}),` to a file, like
`,e.jsx(n.em,{children:"requirements.txt"})," and use it for downloading:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-console",children:`.venv/bin/pip install -r requirements.txt
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"NOTE:"}),` The current development versions are available on TestPyPI
(`,e.jsx(n.a,{href:"https://test.pypi.org/project/oereb-client/",target:"_blank",rel:"nofollow noopener noreferrer",children:"https://test.pypi.org/project/oereb-client/"}),")."]}),`
`]}),`
`,e.jsx(n.h2,{id:"include-the-plugin",children:"Include the plugin"}),`
`,e.jsx(n.p,{children:`Once you have installed the package into your virtual environment, there
are two ways to include it into your Pyramid application.`}),`
`,e.jsxs(n.h3,{id:"1-using-configinclude",children:["1. Using ",e.jsx(n.code,{children:"config.include()"})]}),`
`,e.jsxs(n.p,{children:["Your Pyramid application should start with a kind of ",e.jsx(n.em,{children:"main"}),` method,
similar to this one:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-python",children:`def main(global_config, **settings):
    """
    This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    ...
    config.scan()
    return config.make_wsgi_app()
`})}),`
`,e.jsxs(n.p,{children:[`To include the plugin, you can add the following line somewhere before
`,e.jsx(n.code,{children:"config.scan()"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-python",children:`config.include('oereb_client')
`})}),`
`,e.jsx(n.p,{children:`After restarting the application, the plugin should be loaded, but you
may get some errors because of the still missing configuration.`}),`
`,e.jsx(n.h3,{id:"2-via-the-applications-ini-file",children:"2. Via the application's *.ini file"}),`
`,e.jsxs(n.p,{children:[`Usually you create one or more *.ini file for a Pyramid application,
e.g. `,e.jsx(n.em,{children:"development.ini"})," and ",e.jsx(n.em,{children:"production.ini"}),`, where you configure the
application entry point, logging and maybe other global preferences.`]}),`
`,e.jsx(n.p,{children:"It should start similar to this example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`###
# module configuration
###

[app:main]
use = egg:oereb_client

pyramid.reload_templates = true
pyramid.default_locale_name = en
...
`})}),`
`,e.jsxs(n.p,{children:["Within the ",e.jsx(n.em,{children:"app:main"}),` section, you can also define plugins to be
included:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`[app:main]
use = egg:oereb_client

pyramid.reload_templates = true
pyramid.default_locale_name = en

pyramid.includes =
    oereb_client
    any_other_plugin
...
`})}),`
`,e.jsx(n.p,{children:"After including the plugin, you can proceed with the configuration part."}),`
`,e.jsx(n.h2,{id:"use-container-image",children:"Use container image"}),`
`,e.jsxs(n.p,{children:[`The container images can be found on GitHub in the
`,e.jsx(n.a,{href:"https://github.com/openoereb/oereb_client/pkgs/container/oereb_client",target:"_blank",rel:"nofollow noopener noreferrer",children:"project's container registry"}),"."]}),`
`,e.jsxs(n.p,{children:[`To configure the application, you have to mount your configuration file into the container using
`,e.jsx(n.code,{children:"/app/oereb_client.yml"})," as mount path."]}),`
`,e.jsxs(n.p,{children:["You can adjust the log level using the environment variable ",e.jsx(n.code,{children:"LOG_LEVEL"}),"."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"NOTE:"})," ",e.jsx(n.em,{children:"pyramid_oereb"}),` has to be run in a separate container. You have to use the configuration
parameter `,e.jsx(n.code,{children:"service_url"})," to specify the root URL of your OeREB web service."]}),`
`]})]})}function s(i={}){const{wrapper:n}=Object.assign({},r(),i.components);return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}const l=()=>{throw new Error("Docs-only story")};l.parameters={docsOnly:!0};const o={title:"User Guide/Installation",tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:s};const k=["__page"];export{k as __namedExportsOrder,l as __page,o as default};
