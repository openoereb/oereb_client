import{j as e}from"./iframe-BRWzqT9J.js";import{useMDXComponents as a}from"./index-a2XW11_U.js";import{M as r}from"./blocks-DjkJG0Lw.js";import"./preload-helper-D9Z9MdNV.js";import"./index-BL8cfqU8.js";function o(n){const t={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"API Reference/Store/Main"}),`
`,e.jsx(t.h1,{id:"main-store",children:"Main Store"}),`
`,e.jsxs(t.p,{children:["This application uses ",e.jsx(t.a,{href:"https://react-redux.js.org/",rel:"nofollow",children:"React Redux"}),` to store, manipulate and share
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
`})})]})}function m(n={}){const{wrapper:t}={...a(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{m as default};
