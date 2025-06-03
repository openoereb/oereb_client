import{j as e}from"./iframe-BVmJ0_b8.js";import{useMDXComponents as d}from"./index-uN8qgVDV.js";import{M as s}from"./blocks-o8SxcfTE.js";import"./index-bwzKRnxw.js";function n(t){const r={code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...d(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"API Reference/Request/Extract"}),`
`,e.jsx(r.h1,{id:"queryextractbyid",children:"queryExtractById"}),`
`,e.jsx(r.p,{children:"Queries the extract for the specified E-GRID and language."}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`queryExtractById(applicationUrl, egrid, identdn, number, timeout, language);
`})}),`
`,e.jsx(r.h3,{id:"parameters",children:"Parameters"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Param"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"applicationUrl"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The application URL."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"egrid"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The E-GRID to query the extract for."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"identdn"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The IDENTDN to query the extract for."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"number"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The real estate number to query the extract for."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"timeout"}),e.jsx(r.td,{children:e.jsx("code",{children:"Integer"})}),e.jsx(r.td,{children:"The specified timeout in seconds."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"language"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"(OPTIONAL) The requested language."})]})]})]}),`
`,e.jsx(r.h3,{id:"returns",children:"Returns"}),`
`,e.jsxs(r.p,{children:[e.jsx("code",{children:"Promise"})," A promise receiving the extract data."]}),`
`,e.jsx(r.h1,{id:"querystaticextractbyid",children:"queryStaticExtractById"}),`
`,e.jsx(r.p,{children:"Queries the static extract (PDF) for the specified E-GRID and language."}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`queryStaticExtractById(applicationUrl, egrid, identdn, number, language);
`})}),`
`,e.jsx(r.h3,{id:"parameters-1",children:"Parameters"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Param"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"applicationUrl"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The application URL."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"egrid"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The E-GRID to query the static extract for."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"identdn"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The IDENTDN to query the static extract for."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"number"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The real estate number to query the static extract for."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"timeout"}),e.jsx(r.td,{children:e.jsx("code",{children:"Integer"})}),e.jsx(r.td,{children:"The specified timeout in seconds."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"language"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"(OPTIONAL) The requested language."})]})]})]}),`
`,e.jsx(r.h3,{id:"returns-1",children:"Returns"}),`
`,e.jsxs(r.p,{children:[e.jsx("code",{children:"Promise"})," A promise receiving the static extract document."]}),`
`,e.jsx(r.h1,{id:"sanitizetopiccode",children:"sanitizeTopicCode"}),`
`,e.jsx(r.p,{children:"A helper function to remove special characters from the topic code."}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`sanitizeTopicCode(code);
`})}),`
`,e.jsx(r.h3,{id:"parameters-2",children:"Parameters"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Param"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Description"})]})}),e.jsx(r.tbody,{children:e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"code"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The topic code."})]})})]}),`
`,e.jsx(r.h3,{id:"returns-2",children:"Returns"}),`
`,e.jsxs(r.p,{children:[e.jsx("code",{children:"String"})," The sanitized topic code."]}),`
`,e.jsx(r.h1,{id:"getparenttheme",children:"getParentTheme"}),`
`,e.jsx(r.p,{children:`A helper function to determine the parent theme for a specific subtheme
out of the list of concerned themes.`}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`getParentTheme(theme, concernedThemes);
`})}),`
`,e.jsx(r.h3,{id:"parameters-3",children:"Parameters"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Param"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"theme"}),e.jsx(r.td,{children:e.jsx("code",{children:"Object"})}),e.jsx(r.td,{children:"The subtheme object."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"concernedThemes"}),e.jsx(r.td,{children:e.jsx("code",{children:"Array"})}),e.jsx(r.td,{children:"The list of concerned themes."})]})]})]}),`
`,e.jsx(r.h3,{id:"returns-3",children:"Returns"}),`
`,e.jsxs(r.p,{children:[e.jsx("code",{children:"Object"})," The parent theme."]}),`
`,e.jsx(r.h1,{id:"grouprestrictionsbytopic",children:"groupRestrictionsByTopic"}),`
`,e.jsx(r.p,{children:`A helper function grouping the available restrictions by topic code for easier access.
The concerned themes are needed to find the parent theme for subthemes.`}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`groupRestrictionsByTopic(restrictions, concernedThemes);
`})}),`
`,e.jsx(r.h3,{id:"parameters-4",children:"Parameters"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Param"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"restrictions"}),e.jsx(r.td,{children:e.jsx("code",{children:"Array"})}),e.jsx(r.td,{children:"The list of restrictions."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"concernedThemes"}),e.jsx(r.td,{children:e.jsx("code",{children:"Array"})}),e.jsx(r.td,{children:"The list of concerned themes."})]})]})]}),`
`,e.jsx(r.h3,{id:"returns-4",children:"Returns"}),`
`,e.jsxs(r.p,{children:[e.jsx("code",{children:"Object"})," The grouped restrictions."]})]})}function x(t={}){const{wrapper:r}={...d(),...t.components};return r?e.jsx(r,{...t,children:e.jsx(n,{...t})}):n(t)}export{x as default};
