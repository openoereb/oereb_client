import{j as e}from"./iframe-BVmJ0_b8.js";import{useMDXComponents as a}from"./index-uN8qgVDV.js";import{M as r}from"./blocks-o8SxcfTE.js";import"./index-bwzKRnxw.js";function l(t){const n={code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...a(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"API Reference/Util/Language"}),`
`,e.jsx(n.h1,{id:"getlocalizedtext",children:"getLocalizedText"}),`
`,e.jsx(n.p,{children:`Accepts a multilingual array containing localized texts for certain languages,
the requested language and the default language. The localized text of the
requested language is returned as result. If the requested language is not
available in the array, the default language is used as fallback.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`getLocalizedText(multilingualText, language, defaultLanguage);
`})}),`
`,e.jsx(n.h3,{id:"parameters",children:"Parameters"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Param"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"multilingualText"}),e.jsx(n.td,{children:e.jsx("code",{children:"Array"})}),e.jsx(n.td,{children:"The array containing the localized texts."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"language"}),e.jsx(n.td,{children:e.jsx("code",{children:"String"})}),e.jsx(n.td,{children:"The requested language."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"defaultLanguage"}),e.jsx(n.td,{children:e.jsx("code",{children:"String"})}),e.jsx(n.td,{children:"The default language used as fallback."})]})]})]}),`
`,e.jsx(n.h3,{id:"returns",children:"Returns"}),`
`,e.jsxs(n.p,{children:[e.jsx("code",{children:"String"})," The localized text."]}),`
`,e.jsx(n.h1,{id:"getlocalizedurl",children:"getLocalizedUrl"}),`
`,e.jsx(n.p,{children:`Accepts a multilingual array containing localized URLs for certain languages,
the requested language and the default language. The localized URL of the
requested language is returned as result. If the requested language is not
available in the array, the default language is used as fallback.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`getLocalizedUrl(multilingualUrl, language, defaultLanguage);
`})}),`
`,e.jsx(n.h3,{id:"parameters-1",children:"Parameters"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Param"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"multilingualUrl"}),e.jsx(n.td,{children:e.jsx("code",{children:"Array"})}),e.jsx(n.td,{children:"The array containing the localized URLs."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"language"}),e.jsx(n.td,{children:e.jsx("code",{children:"String"})}),e.jsx(n.td,{children:"The requested language."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"defaultLanguage"}),e.jsx(n.td,{children:e.jsx("code",{children:"String"})}),e.jsx(n.td,{children:"The default language used as fallback."})]})]})]}),`
`,e.jsx(n.h3,{id:"returns-1",children:"Returns"}),`
`,e.jsxs(n.p,{children:[e.jsx("code",{children:"String"})," The localized URL."]})]})}function h(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(l,{...t})}):l(t)}export{h as default};
