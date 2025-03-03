import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as i}from"./index-zKTt_uPv.js";import{M as s}from"./index-DFikv7bs.js";import"./index-F28aNuxU.js";import"./iframe-_WNx4s3R.js";import"./index-frLDzS5o.js";import"./index-BOSlZsdm.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";function r(n){const t={code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"API Reference/Util/String"}),`
`,e.jsx(t.h1,{id:"format",children:"format"}),`
`,e.jsx(t.p,{children:`Accepts a template string and an object containg the values to be replaced.
Each key (e.g. {myKey}) in the template string will be replaced with the
correponding value in the object, if available.`}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-js",children:`format(input, values);
`})}),`
`,e.jsx(t.h3,{id:"parameters",children:"Parameters"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Param"}),e.jsx(t.th,{children:"Type"}),e.jsx(t.th,{children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"input"}),e.jsx(t.td,{children:e.jsx("code",{children:"String"})}),e.jsx(t.td,{children:"The template string."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"values"}),e.jsx(t.td,{children:e.jsx("code",{children:"Object"})}),e.jsx(t.td,{children:"The object containing the values for replacement."})]})]})]}),`
`,e.jsx(t.h3,{id:"returns",children:"Returns"}),`
`,e.jsxs(t.p,{children:[e.jsx("code",{children:"String"})," The formatted string."]})]})}function p(n={}){const{wrapper:t}={...i(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{p as default};
