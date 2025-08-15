import{j as e}from"./iframe-BRWzqT9J.js";import{useMDXComponents as t}from"./index-a2XW11_U.js";import{M as d}from"./blocks-DjkJG0Lw.js";import"./preload-helper-D9Z9MdNV.js";import"./index-BL8cfqU8.js";function n(s){const r={code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"API Reference/Util/Error"}),`
`,e.jsx(r.h1,{id:"nodataerror",children:"NoDataError"}),`
`,e.jsxs(r.p,{children:["Custom error class for handling no-data exceptions on ",e.jsx(r.code,{children:"getegrid"})," requests."]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`new NoDataError(message);
`})}),`
`,e.jsx(r.h3,{id:"parameters",children:"Parameters"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Param"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Description"})]})}),e.jsx(r.tbody,{children:e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"message"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The error message."})]})})]}),`
`,e.jsx(r.h3,{id:"returns",children:"Returns"}),`
`,e.jsxs(r.p,{children:[e.jsx("code",{children:"NoDataError"})," The error instance."]}),`
`,e.jsx(r.h1,{id:"toomanyrequestserror",children:"TooManyRequestsError"}),`
`,e.jsx(r.p,{children:"Custom error class for handling HTTP 429 (Too Many Requests) exceptions."}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`new TooManyRequestsError(message);
`})}),`
`,e.jsx(r.h3,{id:"parameters-1",children:"Parameters"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Param"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Description"})]})}),e.jsx(r.tbody,{children:e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"message"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The error message."})]})})]}),`
`,e.jsx(r.h3,{id:"returns-1",children:"Returns"}),`
`,e.jsxs(r.p,{children:[e.jsx("code",{children:"TooManyRequestsError"})," The error instance."]})]})}function l(s={}){const{wrapper:r}={...t(),...s.components};return r?e.jsx(r,{...s,children:e.jsx(n,{...s})}):n(s)}export{l as default};
