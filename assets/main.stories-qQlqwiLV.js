import{M as s}from"./chunk-HLWAVYOI-4mxnpy-q.js";import{j as e}from"./jsx-runtime-xaxriM6s.js";import{u as a}from"./index-EXpe7ZrZ.js";import"./iframe-B8rZflYG.js";import"../sb-preview/runtime.js";import"./index-NFP2aL9U.js";import"./react-18-89RtvapL.js";import"./index-WO-Izxve.js";import"./chunk-ZGA76URP-PfrU0Dmb.js";import"./pickBy-Eonxbozj.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./mapValues-ZS6BODhJ.js";import"./index-IqZHJlMI.js";import"./index-PPLHz8o0.js";import"./index-Z8kpRV5R.js";function n(o){const t=Object.assign({h1:"h1",p:"p",a:"a",pre:"pre",code:"code"},a(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"API Reference/Store/Main"}),`
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
`})})]})}function i(o={}){const{wrapper:t}=Object.assign({},a(),o.components);return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}const c=()=>{throw new Error("Docs-only story")};c.parameters={docsOnly:!0};const r={title:"API Reference/Store/Main",tags:["stories-mdx"],includeStories:["__page"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:i};const _=["__page"];export{_ as __namedExportsOrder,c as __page,r as default};
