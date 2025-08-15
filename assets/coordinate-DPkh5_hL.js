import{j as e}from"./iframe-BRWzqT9J.js";import{useMDXComponents as d}from"./index-a2XW11_U.js";import{M as t}from"./blocks-DjkJG0Lw.js";import"./preload-helper-D9Z9MdNV.js";import"./index-BL8cfqU8.js";function s(n){const r={code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...d(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"API Reference/Util/Coordinate"}),`
`,e.jsx(r.h1,{id:"parsecoordinatematch",children:"parseCoordinateMatch"}),`
`,e.jsx(r.p,{children:"Parses the coordinate returned by a matched regular expression."}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`parseCoordinateMatch(match);
`})}),`
`,e.jsx(r.h3,{id:"parameters",children:"Parameters"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Param"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Description"})]})}),e.jsx(r.tbody,{children:e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"match"}),e.jsx(r.td,{children:e.jsx("code",{children:"Array"})}),e.jsx(r.td,{children:"The matched values returned by the regular expression."})]})})]}),`
`,e.jsx(r.h3,{id:"returns",children:"Returns"}),`
`,e.jsxs(r.p,{children:[e.jsx("code",{children:"Array"})," Pair of coordinate values ([x, y])."]}),`
`,e.jsx(r.h1,{id:"islv95",children:"isLV95"}),`
`,e.jsx(r.p,{children:"Checks, whether the value is a LV95 coordinate or not."}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`isLV95(value);
`})}),`
`,e.jsx(r.h3,{id:"parameters-1",children:"Parameters"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Param"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Description"})]})}),e.jsx(r.tbody,{children:e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"value"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The value to be checked."})]})})]}),`
`,e.jsx(r.h3,{id:"returns-1",children:"Returns"}),`
`,e.jsxs(r.p,{children:[e.jsx("code",{children:"Boolean"})," True, if the value is a LV95 coordinate, false otherwise."]}),`
`,e.jsx(r.h1,{id:"isgnss",children:"isGNSS"}),`
`,e.jsx(r.p,{children:"Checks, whether the value is a GNSS coordinate or not."}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`isGNSS(value);
`})}),`
`,e.jsx(r.h3,{id:"parameters-2",children:"Parameters"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Param"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Description"})]})}),e.jsx(r.tbody,{children:e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"value"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The value to be checked."})]})})]}),`
`,e.jsx(r.h3,{id:"returns-2",children:"Returns"}),`
`,e.jsxs(r.p,{children:[e.jsx("code",{children:"Boolean"})," True, if the value is a GNSS coordinate, false otherwise."]}),`
`,e.jsx(r.h1,{id:"getcoordinates",children:"getCoordinates"}),`
`,e.jsx(r.p,{children:`Parses the specified value and returns an array containing the coordinate values.
If the value contains GNSS coordinates, the result will be transformed to LV95.`}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`getCoordinates(value);
`})}),`
`,e.jsx(r.h3,{id:"parameters-3",children:"Parameters"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Param"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Description"})]})}),e.jsx(r.tbody,{children:e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"value"}),e.jsx(r.td,{children:e.jsx("code",{children:"String"})}),e.jsx(r.td,{children:"The value to be parsed."})]})})]}),`
`,e.jsx(r.h3,{id:"returns-3",children:"Returns"}),`
`,e.jsxs(r.p,{children:[e.jsx("code",{children:"Array|null"})," The parsed pair of coordinate values (LV95) or null."]})]})}function o(n={}){const{wrapper:r}={...d(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(s,{...n})}):s(n)}export{o as default};
