import {Modal} from 'bootstrap';
import React from "react";

const OerebPermalink = function() {
    const permalinkElement = document.getElementById('permalinkModal');
    const permalinkInput = permalinkElement.querySelector('input');
    const permalink = Modal.getOrCreateInstance(permalinkElement);

    if (permalinkElement.getAttribute('data-bs-modal-shown-listener') !== 'true') {
        permalinkElement.addEventListener('shown.bs.modal', () => {
            permalinkInput.focus();
            permalinkInput.select();
        });
        permalinkElement.setAttribute('data-bs-modal-shown-listener', 'true');
    }

    const showPermalink = function() {
        permalinkInput.value = window.location;
        permalink.show();
    };

    return (
        <button type="button" className="btn btn-outline-secondary" onClick={showPermalink} title="Permalink">
            <i className="bi bi-link-45deg"></i>
        </button>
    );
};

export default OerebPermalink;
