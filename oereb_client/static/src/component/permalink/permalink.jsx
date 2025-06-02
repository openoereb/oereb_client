import "./permalink.scss";

import {Modal} from "bootstrap";
import React from "react";
import {useTranslation} from "react-i18next";

/**
 * A simple button component, that shows the current permalink in a bootstrap modal.
 * The document has to contain the modal element with the ID _#permalinkModal_.
 *
 * ```html
 * <div class="modal fade" id="permalinkModal" tabIndex="-1" aria-hidden="true">
 *   <div class="modal-dialog modal-lg">
 *     <div class="modal-content">
 *       <div class="modal-header">
 *         <h5 class="modal-title">Permalink</h5>
 *         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
 *       </div>
 *       <div class="modal-body">
 *         <input class="form-control" />
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * ```
 */
const OerebPermalink = function () {
  const {t} = useTranslation();
  const permalinkElement = document.getElementById("permalinkModal");
  const permalinkInput = permalinkElement.querySelector("input");
  const permalinkTitle = permalinkElement.querySelector("h5");
  const permalink = Modal.getOrCreateInstance(permalinkElement);

  if (permalinkElement.getAttribute("data-bs-modal-shown-listener") !== "true") {
    permalinkElement.addEventListener("shown.bs.modal", () => {
      permalinkInput.focus();
      permalinkInput.select();
    });
    permalinkElement.setAttribute("data-bs-modal-shown-listener", "true");
  }

  /**
   * Update the modal content and call the show method.
   */
  const showPermalink = function () {
    permalinkTitle.textContent = t("extract.permalink.title");
    permalinkInput.value = window.location;
    permalink.show();
  };

  return (
    <button type="button"
      className="btn btn-outline-secondary oereb-client-permalink"
      onClick={showPermalink}
      title={t("extract.permalink.title")}>
      <i className="bi bi-link-45deg"></i>
    </button>
  );
};

OerebPermalink.propTypes = {};

export default OerebPermalink;
