import "./information_panel.scss";

import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setInformationPanelTab, toggleInformationPanel} from "../../reducer/extract";
import OerebExclusionOfLiability from "./exclusion_of_liability";
import OerebGeneralInformation from "./general_information";
import OerebGlossary from "./glossary";

const OerebInformationPanel = function() {
    const dispatch = useDispatch();
    const extract = useSelector((state) => state.extract);
    const panel = useRef(null);

    const tabs = [
        {
            title: 'Allgemein',
            content: <OerebGeneralInformation />
        },
        {
            title: 'Haftungsausschluss',
            content: <OerebExclusionOfLiability />
        },
        {
            title: 'Glossar',
            content: <OerebGlossary />
        }
    ];

    const content = tabs[extract.tab].content;

    const setActiveTab = function(key) {
        dispatch(setInformationPanelTab(key));
    };

    const togglePanel = function() {
        dispatch(toggleInformationPanel());
    };

    const tabElements = tabs.map((tab, key) => {
        let className = 'nav-link';
        if (key === extract.tab) {
            className += ' active';
        }
        return (
            <li key={key} className="nav-item">
                    <button className={className}
                            onClick={setActiveTab.bind(this, key)}>
                        <span className="text-body">
                            {tab.title}
                        </span>
                    </button>
            </li>
        );
    });

    useEffect(() => {
        panel.current.classList.remove('disabled', 'hidden', 'shown');
        if (extract.visible) {
            if (extract.information) {
                panel.current.classList.add('shown');
            }
            else {
                panel.current.classList.add('hidden');
            }
        }
        else {
            panel.current.classList.add('disabled');
        }
    });

    return (
        <div ref={panel} className="oereb-client-information-panel container-fluid">
            <ul className="nav nav-tabs mb-4">
                {tabElements}
                <li className="nav-item ms-auto">
                    <button className="nav-link text-body" onClick={togglePanel}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </li>
            </ul>
            {content}
        </div>
    );
};

export default OerebInformationPanel;
