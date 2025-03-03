import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as d}from"./index-F28aNuxU.js";import{T as u}from"./bootstrap.esm-CK6IUOcm.js";import{a as b,u as x}from"./react-redux-DiBVDDrZ.js";import{M as f,s as y,a as w}from"./message-0ds0OStr.js";import"./redux-toolkit.modern-DkWCaux4.js";const i=function(){const a=d.useRef(null),o=b(s=>s.message).messages.map((s,n)=>{let t,c,m;return s.type==="error"?(t="toast align-items-center bg-danger",c="toast-body text-bg-danger",m=e.jsx("i",{className:"bi bi-x-octagon-fill text-bg-danger"})):(t="toast align-items-center bg-secondary",c="toast-body text-bg-secondary",m=e.jsx("i",{className:"bi bi-exclamation-triangle-fill text-bg-secondary"})),e.jsx("div",{className:t,role:"alert","aria-live":"assertive","aria-atomic":"true","data-bs-autohide":"false",children:e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{className:"ms-3 m-auto h4",children:m}),e.jsx("div",{className:c,children:s.text})]})},s.id)});return d.useEffect(()=>{a.current.querySelectorAll(".toast").forEach(n=>{if(!n.hasAttribute("initialized")){const t=u.getOrCreateInstance(n);t.show(),setTimeout(()=>{t.hide()},f-500)}n.setAttribute("initialized",!0)})},[o]),e.jsx("div",{ref:a,className:"toast-container position-absolute top-0 end-0 mt-3 me-3",children:o})};i.propTypes={};i.__docgenInfo={description:"This component shows messages (warnings, errors) in the user interface.",methods:[],displayName:"OerebMessage"};const C={title:"API Reference/Component/Message",component:i},r=()=>{const a=x(),l=()=>{a(y("This is a warning message example."))},o=()=>{a(w("This is an error message example."))};return e.jsxs("div",{style:{"min-height":"300px"},children:[e.jsx("button",{type:"button",className:"btn btn-primary me-3",onClick:l,children:"Show warning"}),e.jsx("button",{type:"button",className:"btn btn-primary me-3",onClick:o,children:"Show error"}),e.jsx(i,{})]})};r.__docgenInfo={description:"",methods:[],displayName:"Message"};var p,g,h;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  const dispatch = useDispatch();
  const warning = () => {
    dispatch(showWarning('This is a warning message example.'));
  };
  const error = () => {
    dispatch(showError('This is an error message example.'));
  };
  return <div style={{
    'min-height': '300px'
  }}>
      <button type="button" className="btn btn-primary me-3" onClick={warning}>Show warning</button>
      <button type="button" className="btn btn-primary me-3" onClick={error}>Show error</button>
      <OerebMessage />
    </div>;
}`,...(h=(g=r.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const E=["Message"];export{r as Message,E as __namedExportsOrder,C as default};
