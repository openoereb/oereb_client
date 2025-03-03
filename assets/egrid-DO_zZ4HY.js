import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as i}from"./index-zKTt_uPv.js";import{M as s}from"./index-DFikv7bs.js";import"./index-F28aNuxU.js";import"./iframe-_WNx4s3R.js";import"./index-frLDzS5o.js";import"./index-BOSlZsdm.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";function n(t){const r={code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"API Reference/Request/E-GRID"}),`
`,e.jsx(r.h1,{id:"queryegridbycoord",children:"queryEgridByCoord"}),`
`,e.jsx(r.p,{children:"Queries an E-GRID using the given coordinates and returns a promise for receiving the results."}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`queryEgridByCoord(applicationUrl, coord);
`})}),`
`,e.jsx(r.h3,{id:"parameters",children:"Parameters"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Param"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"applicationUrl"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The application URL."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"coord"}),e.jsx(r.td,{children:e.jsx("code",{children:"Array"})}),e.jsx(r.td,{children:"The coordinates to query for."})]})]})]}),`
`,e.jsx(r.h3,{id:"returns",children:"Returns"}),`
`,e.jsxs(r.p,{children:[e.jsx("code",{children:"Promise"})," A promise receiving the query results."]})]})}function m(t={}){const{wrapper:r}={...i(),...t.components};return r?e.jsx(r,{...t,children:e.jsx(n,{...t})}):n(t)}export{m as default};
