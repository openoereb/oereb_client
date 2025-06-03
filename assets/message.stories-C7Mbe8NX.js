import{r as d,a as u,j as e,M as b,u as x,v as y,w as f}from"./iframe-BVmJ0_b8.js";import{T as w}from"./bootstrap.esm-CGXSla9n.js";const i=function(){const a=d.useRef(null),r=u(s=>s.message).messages.map((s,o)=>{let t,c,m;return s.type==="error"?(t="toast align-items-center bg-danger",c="toast-body text-bg-danger",m=e.jsx("i",{className:"bi bi-x-octagon-fill text-bg-danger"})):(t="toast align-items-center bg-secondary",c="toast-body text-bg-secondary",m=e.jsx("i",{className:"bi bi-exclamation-triangle-fill text-bg-secondary"})),e.jsx("div",{className:t,role:"alert","aria-live":"assertive","aria-atomic":"true","data-bs-autohide":"false",children:e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{className:"ms-3 m-auto h4",children:m}),e.jsx("div",{className:c,children:s.text})]})},s.id)});return d.useEffect(()=>{a.current.querySelectorAll(".toast").forEach(o=>{if(!o.hasAttribute("initialized")){const t=w.getOrCreateInstance(o);t.show(),setTimeout(()=>{t.hide()},b-500)}o.setAttribute("initialized",!0)})},[r]),e.jsx("div",{ref:a,className:"toast-container position-absolute top-0 end-0 mt-3 me-3",children:r})};i.propTypes={};i.__docgenInfo={description:"This component shows messages (warnings, errors) in the user interface.",methods:[],displayName:"OerebMessage"};const v={title:"API Reference/Component/Message",component:i,tags:["autodocs"]},n=()=>{const a=x(),l=()=>{a(y("This is a warning message example."))},r=()=>{a(f("This is an error message example."))};return e.jsxs("div",{style:{"min-height":"300px"},children:[e.jsx("button",{type:"button",className:"btn btn-primary me-3",onClick:l,children:"Show warning"}),e.jsx("button",{type:"button",className:"btn btn-primary me-3",onClick:r,children:"Show error"}),e.jsx(i,{})]})};n.__docgenInfo={description:"",methods:[],displayName:"Message"};var g,p,h;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
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
}`,...(h=(p=n.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};const T=["Message"];export{n as Message,T as __namedExportsOrder,v as default};
