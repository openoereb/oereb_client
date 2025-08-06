import { Toast } from "bootstrap";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close, MESSAGE_TIMEOUT } from "../../reducer/message";
import "./message.scss";
import { useTranslation } from "react-i18next";
import { isString } from "lodash";

/**
 * This component shows messages (warnings, errors) in the user interface.
 */
const OerebMessage = function () {
  const element = useRef(null);
  const messages = useSelector((state) => state.message).messages;
  const language = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const closeMessage = function(messageId) {
    const toasts = document.body.querySelectorAll(".toast");
    toasts.forEach((toastEl) => {
      if (toastEl.getAttribute("data-oereb-message-id") === messageId) {
        Toast.getOrCreateInstance(toastEl).hide();
      }
    });
    setTimeout(() => {
      dispatch(close(messageId));
    }, 500);
  };

  const items = messages.map((message, key) => {
    let toastTitle;
    let toastIcon;
    if (message.type === "warning") {
      toastIcon = <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>;
      toastTitle = t("message.warning");
    }
    else if (message.type === "error") {
      toastIcon = <i className="bi bi-x-octagon-fill text-danger me-2"></i>;
      toastTitle = t("message.error");
    }
    else {
      toastIcon = <i className="bi bi-info-circle-fill text-primary me-2"></i>;
      toastTitle = t("message.info");
    }
    let text;
    if (isString(message.text)) {
      text = message.text;
    }
    else {
      text = message.text[language.current] || message.text[language.default];
    }
    return (
      <div
        key={message.id}
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-autohide="false"
        data-oereb-message-id={message.id}
        data-oereb-message-confirm={message.confirmation}
      >
        <div className="toast-header">
          {toastIcon}
          <strong className="me-auto">{toastTitle}</strong>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={closeMessage.bind(this, message.id)}
          ></button>
        </div>
        <div className="toast-body">
          {text}
        </div>
      </div>
    );
  });

  useEffect(() => {
    const toasts = element.current.querySelectorAll(".toast");
    toasts.forEach((toastEl) => {
      if (!toastEl.hasAttribute("initialized")) {
        const toast = Toast.getOrCreateInstance(toastEl);
        toast.show();
        if (toastEl.getAttribute("data-oereb-message-confirm") !== "true") {
          setTimeout(() => {
            toast.hide();
          }, MESSAGE_TIMEOUT - 500);
        }
      }
      toastEl.setAttribute("initialized", true);
    });
  }, [items]);

  return (
    <div ref={element} className="toast-container position-absolute bottom-0 end-0 mb-3 me-3">
      {items}
    </div>
  );
};

OerebMessage.propTypes = {};

export default OerebMessage;
