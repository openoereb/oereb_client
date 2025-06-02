import React from "react";

import OerebPermalink from "./permalink";

const modalWrapper = document.createElement("div");
modalWrapper.setAttribute("class", "modal fade");
modalWrapper.setAttribute("id", "permalinkModal");
modalWrapper.setAttribute("tabIndex", "-1");
modalWrapper.setAttribute("aria-hidden", "true");

const modalDialog = document.createElement("div");
modalDialog.setAttribute("class", "modal-dialog modal-lg");

const modalContent = document.createElement("div");
modalContent.setAttribute("class", "modal-content");

const modalHeader = document.createElement("div");
modalHeader.setAttribute("class", "modal-header");

const modalTitle = document.createElement("h5");
modalTitle.setAttribute("class", "modal-title");
modalTitle.textContent = "Permalink";

const modalClose = document.createElement("button");
modalClose.setAttribute("type", "button");
modalClose.setAttribute("class", "btn-close");
modalClose.setAttribute("data-bs-dismiss", "modal");
modalClose.setAttribute("aria-label", "Close");

const modalBody = document.createElement("div");
modalBody.setAttribute("class", "modal-body");

const modalForm = document.createElement("input");
modalForm.setAttribute("class", "form-control");

modalWrapper.appendChild(modalDialog);
modalDialog.appendChild(modalContent);
modalContent.appendChild(modalHeader);
modalContent.appendChild(modalBody);
modalHeader.appendChild(modalTitle);
modalHeader.appendChild(modalClose);
modalBody.appendChild(modalForm);

document.body.appendChild(modalWrapper);

export default {
  title: "API Reference/Component/Permalink",
  component: OerebPermalink,
  tags: ["autodocs"]
};

export const Permalink = () => <OerebPermalink />;
