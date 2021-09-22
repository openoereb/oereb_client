import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setActiveCategory, setActiveTopic, setViewServices} from '../../reducer/accordion';
import {hideExtract, toggleCollapsed, toggleInformationPanel} from '../../reducer/extract';
import OerebCategory from '../category/category';
import OerebExternalViewer from '../external_viewer/external_viewer';
import OerebPermalink from '../permalink/permalink';
import OerebRealEstate from '../real_estate/real_estate';
import OerebStaticExtract from '../static_extract/static_extract';

const OerebExtractData = function() {
    const extract = useSelector((state) => state.extract);
    const dispatch = useDispatch();

    const closeExtract = function() {
        dispatch(setViewServices([]));
        dispatch(setActiveTopic(null));
        dispatch(setActiveCategory(null));
        dispatch(hideExtract());
    };

    const extractData = extract.data['GetExtractByIdResponse']['extract'];
    const collapsed = extract.collapsed;

    const toggleInfo = function() {
        dispatch(toggleInformationPanel());
    };

    const collapseExtract = function() {
        dispatch(toggleCollapsed());
    };

    const collapseButton = (() => {
        let title = 'Auszug ausblenden';
        let iconClass = 'bi bi-chevron-up';
        if (collapsed) {
            title = 'Auszug einblenden';
            iconClass = 'bi bi-chevron-down';
        }
        return (
            <button type="button"
                    className="btn btn-outline-secondary collapse-extract"
                    title={title}
                    onClick={collapseExtract}>
                <i className={iconClass}></i>
            </button>
        );
    })();

    const dataClasses = [
        'oereb-client-extract',
        'data container-fluid',
        'd-flex',
        'flex-column',
        'justify-content-start',
        'align-items-stretch'
    ];

    return (
        <div className={dataClasses.join(' ')}>
            <div>
                <div className="btn-group float-end" role="group">
                    {collapseButton}
                    <button onClick={closeExtract}
                            className="btn btn-outline-secondary"
                            type="button">
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <div className="btn-group float-start" role="group">
                    <OerebPermalink />
                    <OerebExternalViewer />
                    <OerebStaticExtract />
                    <button type="button"
                            className="btn btn-outline-secondary"
                            title="Allgemeine und rechtliche Informationen"
                            onClick={toggleInfo}>
                        <i className="bi bi-info-square"></i>
                    </button>
                </div>
            </div>
            <OerebRealEstate data={extractData.RealEstate} />
            <div className="accordion accordion-flush flex-grow-1 mt-1 mb-2">
                <OerebCategory title="Betroffene Themen"
                               data={extractData.ConcernedTheme}
                               restriction={true} />
                <OerebCategory title="Nicht betroffene Themen"
                               data={extractData.NotConcernedTheme}
                               restriction={false} />
                <OerebCategory title="Nicht verfügbare Themen"
                               data={extractData.ThemeWithoutData}
                               restriction={false} />
            </div>
        </div>
    )
};

export default OerebExtractData;
