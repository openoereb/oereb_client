import{j as e}from"./iframe-BVmJ0_b8.js";import{useMDXComponents as s}from"./index-uN8qgVDV.js";import{M as d}from"./blocks-o8SxcfTE.js";import"./index-bwzKRnxw.js";function t(n){const r={code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"API Reference/Request/E-GRID"}),`
`,e.jsx(r.h1,{id:"queryegridbycoord",children:"queryEgridByCoord"}),`
`,e.jsx(r.p,{children:"Queries an E-GRID using the given coordinates and returns a promise for receiving the results."}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`queryEgridByCoord(applicationUrl, coord);
`})}),`
`,e.jsx(r.h3,{id:"parameters",children:"Parameters"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Param"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"applicationUrl"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The application URL."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"coord"}),e.jsx(r.td,{children:e.jsx("code",{children:"Array"})}),e.jsx(r.td,{children:"The coordinates to query for."})]})]})]}),`
`,e.jsx(r.h3,{id:"returns",children:"Returns"}),`
`,e.jsxs(r.p,{children:[e.jsx("code",{children:"Promise"})," A promise receiving the query results."]})]})}function l(n={}){const{wrapper:r}={...s(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(t,{...n})}):t(n)}export{l as default};
