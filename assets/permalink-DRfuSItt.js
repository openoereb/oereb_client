import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{M as r}from"./bootstrap.esm-CK6IUOcm.js";import"./index-F28aNuxU.js";import{u as d}from"./useTranslation-HHJENg9B.js";const o=function(){const{t:n}=d(),t=document.getElementById("permalinkModal"),e=t.querySelector("input"),l=t.querySelector("h5"),i=r.getOrCreateInstance(t);t.getAttribute("data-bs-modal-shown-listener")!=="true"&&(t.addEventListener("shown.bs.modal",()=>{e.focus(),e.select()}),t.setAttribute("data-bs-modal-shown-listener","true"));const s=function(){l.textContent=n("extract.permalink.title"),e.value=window.location,i.show()};return a.jsx("button",{type:"button",className:"btn btn-outline-secondary oereb-client-permalink",onClick:s,title:n("extract.permalink.title"),children:a.jsx("i",{className:"bi bi-link-45deg"})})};o.propTypes={};o.__docgenInfo={description:`A simple button component, that shows the current permalink in a bootstrap modal.
The document has to contain the modal element with the ID _#permalinkModal_.

\`\`\`html
<div class="modal fade" id="permalinkModal" tabIndex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Permalink</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input class="form-control" />
      </div>
    </div>
  </div>
</div>
\`\`\``,methods:[],displayName:"OerebPermalink"};export{o as O};
