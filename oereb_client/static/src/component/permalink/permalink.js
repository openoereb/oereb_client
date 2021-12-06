import {Modal} from 'bootstrap';
import React from "react";
import {useTranslation} from 'react-i18next';

const OerebPermalink = function () {
  const {t} = useTranslation();
  const permalinkElement = document.getElementById('permalinkModal');
  const permalinkInput = permalinkElement.querySelector('input');
  const permalinkTitle = permalinkElement.querySelector('h5');
  const permalink = Modal.getOrCreateInstance(permalinkElement);

  if (permalinkElement.getAttribute('data-bs-modal-shown-listener') !== 'true') {
    permalinkElement.addEventListener('shown.bs.modal', () => {
      permalinkInput.focus();
      permalinkInput.select();
    });
    permalinkElement.setAttribute('data-bs-modal-shown-listener', 'true');
  }

  const showPermalink = function () {
    permalinkTitle.textContent = t('extract.permalink.title');
    permalinkInput.value = window.location;
    permalink.show();
  };

  return (
    <button type="button"
      className="btn btn-outline-secondary oereb-client-permalink"
      onClick={showPermalink}
      title={t('extract.permalink.title')}>
      <i className="bi bi-link-45deg"></i>
    </button>
  );
};

export default OerebPermalink;
