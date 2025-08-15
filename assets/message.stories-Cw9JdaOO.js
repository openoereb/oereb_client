import{r as p,a as b,u as h,l as y,j as t,M as w,w as j,i as N,y as T}from"./iframe-BRWzqT9J.js";import{T as g}from"./bootstrap.esm-BjiTvFHt.js";import{u as M}from"./useTranslation-BgpURjWR.js";import"./preload-helper-D9Z9MdNV.js";const c=function(){const n=p.useRef(null),l=b(e=>e.message).messages,o=b(e=>e.language),x=h(),{t:m}=M(),f=function(e){document.body.querySelectorAll(".toast").forEach(s=>{s.getAttribute("data-oereb-message-id")===e&&g.getOrCreateInstance(s).hide()}),setTimeout(()=>{x(j(e))},500)},u=l.map((e,a)=>{let s,i;e.type==="warning"?(i=t.jsx("i",{className:"bi bi-exclamation-triangle-fill text-warning me-2"}),s=m("message.warning")):e.type==="error"?(i=t.jsx("i",{className:"bi bi-x-octagon-fill text-danger me-2"}),s=m("message.error")):(i=t.jsx("i",{className:"bi bi-info-circle-fill text-primary me-2"}),s=m("message.info"));let d;return y.isString(e.text)?d=e.text:d=e.text[o.current]||e.text[o.default],t.jsxs("div",{className:"toast",role:"alert","aria-live":"assertive","aria-atomic":"true","data-bs-autohide":"false","data-oereb-message-id":e.id,"data-oereb-message-confirm":e.confirmation,children:[t.jsxs("div",{className:"toast-header",children:[i,t.jsx("strong",{className:"me-auto",children:s}),t.jsx("button",{type:"button",className:"btn-close","aria-label":"Close",onClick:f.bind(this,e.id)})]}),t.jsx("div",{className:"toast-body",children:d})]},e.id)});return p.useEffect(()=>{n.current.querySelectorAll(".toast").forEach(a=>{if(!a.hasAttribute("initialized")){const s=g.getOrCreateInstance(a);s.show(),a.getAttribute("data-oereb-message-confirm")!=="true"&&setTimeout(()=>{s.hide()},w-500)}a.setAttribute("initialized",!0)})},[u]),t.jsx("div",{ref:n,className:"toast-container position-absolute bottom-0 end-0 mb-3 me-3",children:u})};c.propTypes={};c.__docgenInfo={description:"This component shows messages (warnings, errors) in the user interface.",methods:[],displayName:"OerebMessage"};const E={title:"API Reference/Component/Message",component:c,tags:["autodocs"]},r=()=>{const n=h(),l=()=>{n(N("This is a warning message example."))},o=()=>{n(T("This is an error message example."))};return t.jsxs("div",{style:{"min-height":"300px"},children:[t.jsx("button",{type:"button",className:"btn btn-primary me-3",onClick:l,children:"Show warning"}),t.jsx("button",{type:"button",className:"btn btn-primary me-3",onClick:o,children:"Show error"}),t.jsx(c,{})]})};r.__docgenInfo={description:"",methods:[],displayName:"Message"};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const dispatch = useDispatch();
  const warning = () => {
    dispatch(showWarning("This is a warning message example."));
  };
  const error = () => {
    dispatch(showError("This is an error message example."));
  };
  return <div style={{
    "min-height": "300px"
  }}>
      <button type="button" className="btn btn-primary me-3" onClick={warning}>Show warning</button>
      <button type="button" className="btn btn-primary me-3" onClick={error}>Show error</button>
      <OerebMessage />
    </div>;
}`,...r.parameters?.docs?.source}}};const _=["Message"];export{r as Message,_ as __namedExportsOrder,E as default};
