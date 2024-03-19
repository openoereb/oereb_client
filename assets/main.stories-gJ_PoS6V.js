import{M as s}from"./chunk-HLWAVYOI-B9V7wvNL.js";import{j as e}from"./jsx-runtime-BdbbjX0y.js";import{useMDXComponents as a}from"./index-CyBdWrLu.js";import"./iframe-UKKheDOz.js";import"../sb-preview/runtime.js";import"./index-Cllag2AU.js";import"./react-18-fKzX_DAj.js";import"./chunk-EIRT5I3Z-DXochb4c.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";import"./index-B_J8iUie.js";import"./index-CVADV4A6.js";import"./index-DrFu-skq.js";function r(o){const t=Object.assign({h1:"h1",p:"p",a:"a",pre:"pre",code:"code"},a(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"API Reference/Store/Main"}),`
`,e.jsx(t.h1,{id:"main-store",children:"Main Store"}),`
`,e.jsxs(t.p,{children:["This application uses ",e.jsx(t.a,{href:"https://react-redux.js.org/",target:"_blank",rel:"nofollow noopener noreferrer",children:"React Redux"}),` to store, manipulate and share
states and data across the whole application. It provides one main store containing a bunch of
slices for different parts and components.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-js",children:`const MainStore = configureStore({
  reducer: {
    config: configReducer,              // Contains the configuration, to be available application-wide
    map: mapReducer,                    // Provides the map instance and some layers
    mapQuery: mapQueryReducer,          // Controls the state and position of the map query component
    extract: extractReducer,            // Provides the extract status and data
    accordion: accordionReducer,        // Controls the visibility of the different categories and topics
    language: languageReducer,          // Controls the language settings
    availability: availabilityReducer,  // Controls the visibility of the availabiliity layer
    symbolZoom: symbolZoomReducer,      // Controls the zoom for legend symbols (enabled/disabled)
    history: historyReducer,            // Controls the extract history (5 latest real estates)
    message: messageReducer             // Controls warning and error messages
  }
});
`})})]})}function i(o={}){const{wrapper:t}=Object.assign({},a(),o.components);return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}const c=()=>{throw new Error("Docs-only story")};c.parameters={docsOnly:!0};const n={title:"API Reference/Store/Main",tags:["stories-mdx"],includeStories:["__page"]};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:i};const R=["__page"];export{R as __namedExportsOrder,c as __page,n as default};
