import { Toast } from 'bootstrap';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { MESSAGE_TIMEOUT } from '../../reducer/message';
import './message.scss';

/**
 * This component shows messages (warnings, errors) to the user.
 */
const OerebMessage = function () {
  const element = useRef(null);
  const messages = useSelector((state) => state.message).messages;

  const items = messages.map((message, key) => {
    let toastClass;
    let toastBodyClass;
    let toastIcon;
    if (message.type === 'error') {
      toastClass = 'toast align-items-center bg-danger';
      toastBodyClass = 'toast-body text-bg-danger';
      toastIcon = <i className="bi bi-x-octagon-fill text-bg-danger"></i>;
    }
    else {
      toastClass = 'toast align-items-center bg-secondary';
      toastBodyClass = 'toast-body text-bg-secondary';
      toastIcon = <i className="bi bi-exclamation-triangle-fill text-bg-secondary"></i>;
    }
    return (
      <div key={message.id} className={toastClass} role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
        <div className="d-flex">
          <div className="ms-3 m-auto h4">
            {toastIcon}
          </div>
          <div className={toastBodyClass}>
            {message.text}
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    const toasts = element.current.querySelectorAll('.toast');
    toasts.forEach((toastEl) => {
      if (!toastEl.hasAttribute('initialized')) {
        const toast = Toast.getOrCreateInstance(toastEl);
        toast.show();
        setTimeout(() => {
          toast.hide();
        }, MESSAGE_TIMEOUT - 500);
      }
      toastEl.setAttribute('initialized', true);
    });
  }, [items]);

  return (
    <div ref={element} className="toast-container position-absolute top-0 end-0 mt-3 me-3">
      {items}
    </div>
  );
};

OerebMessage.propTypes = {};

export default OerebMessage;
