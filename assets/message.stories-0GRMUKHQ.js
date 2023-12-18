import{j as e}from"./jsx-runtime-xaxriM6s.js";import{r as d}from"./index-NFP2aL9U.js";import{T as u}from"./bootstrap.esm-M_-ShOkb.js";import{a as x,u as f}from"./react-redux-lyTcZrjd.js";import{M as y,s as w,a as j}from"./message-QrGi5H7S.js";import"./index-WO-Izxve.js";import"./redux-toolkit.modern-4cJeFKZ4.js";import"./v4-yQnnJER4.js";const m=function(){const a=d.useRef(null),o=x(s=>s.message).messages.map((s,n)=>{let t,i,c;return s.type==="error"?(t="toast align-items-center bg-danger",i="toast-body text-bg-danger",c=e.jsx("i",{className:"bi bi-x-octagon-fill text-bg-danger"})):(t="toast align-items-center bg-secondary",i="toast-body text-bg-secondary",c=e.jsx("i",{className:"bi bi-exclamation-triangle-fill text-bg-secondary"})),e.jsx("div",{className:t,role:"alert","aria-live":"assertive","aria-atomic":"true","data-bs-autohide":"false",children:e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{className:"ms-3 m-auto h4",children:c}),e.jsx("div",{className:i,children:s.text})]})},s.id)});return d.useEffect(()=>{a.current.querySelectorAll(".toast").forEach(n=>{if(!n.hasAttribute("initialized")){const t=u.getOrCreateInstance(n);t.show(),setTimeout(()=>{t.hide()},y-500)}n.setAttribute("initialized",!0)})},[o]),e.jsx("div",{ref:a,className:"toast-container position-absolute top-0 end-0 mt-3 me-3",children:o})};m.propTypes={};const b=m;m.__docgenInfo={description:"This component shows messages (warnings, errors) in the user interface.",methods:[],displayName:"OerebMessage"};const O={title:"API Reference/Component/Message",component:b},r=()=>{const a=f(),l=()=>{a(w("This is a warning message example."))},o=()=>{a(j("This is an error message example."))};return e.jsxs("div",{style:{"min-height":"300px"},children:[e.jsx("button",{type:"button",className:"btn btn-primary me-3",onClick:l,children:"Show warning"}),e.jsx("button",{type:"button",className:"btn btn-primary me-3",onClick:o,children:"Show error"}),e.jsx(b,{})]})};var p,g,h;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
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
}`,...(h=(g=r.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};r.__docgenInfo={description:"",methods:[],displayName:"Message"};const I=["Message"];export{r as Message,I as __namedExportsOrder,O as default};
