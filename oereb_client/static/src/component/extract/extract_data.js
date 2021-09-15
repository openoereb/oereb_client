import {Modal} from 'bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import {useDispatch} from 'react-redux';

import {setActiveCategory, setActiveTopic, setViewServices} from '../../reducer/accordion';
import {hideExtract} from '../../reducer/extract';
import OerebCategory from '../category/category';
import OerebRealEstate from '../real_estate/real_estate';

const OerebExtractData = function(props) {
    const dispatch = useDispatch();

    const closeExtract = function() {
        dispatch(setViewServices([]));
        dispatch(setActiveTopic(null));
        dispatch(setActiveCategory(null));
        dispatch(hideExtract());
    };

    const extract = props.data;

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
        <div className="oereb-client-extract data container-fluid d-flex flex-column justify-content-start align-items-stretch">
            <div>
                <div className="float-end">
                    <button onClick={closeExtract}
                            className="btn btn-outline-secondary"
                            type="button">
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <div className="btn-group float-start" role="group">
                    <button type="button" className="btn btn-outline-secondary" onClick={showPermalink}>
                        <i className="bi bi-link-45deg"></i>
                    </button>
                    <button type="button" className="btn btn-outline-secondary">
                        <i className="bi bi-map"></i>
                    </button>
                    <button type="button" className="btn btn-outline-secondary">
                        <i className="bi bi-file-earmark-pdf"></i>
                    </button>
                </div>
            </div>
            <OerebRealEstate data={extract.RealEstate} />
            <div className="accordion accordion-flush flex-grow-1 mt-1">
                <OerebCategory title="Betroffene Themen" data={extract.ConcernedTheme} restriction={true} />
                <OerebCategory title="Nicht betroffene Themen" data={extract.NotConcernedTheme} restriction={false} />
                <OerebCategory title="Nicht verfügbare Themen" data={extract.ThemeWithoutData} restriction={false} />
            </div>
        </div>
    )
};

OerebExtractData.propTypes = {
    data: PropTypes.object.isRequired
};

export default OerebExtractData;
