import "./information_panel.scss";

import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setInformationPanelTab, toggleInformationPanel} from "../../reducer/extract";
import OerebGeneralInformation from "./general_information";
import OerebMultilingualCatalog from "./multilingual_catalog";

const OerebInformationPanel = function() {
    const dispatch = useDispatch();
    const extract = useSelector((state) => state.extract);
    const panel = useRef(null);
    const [search, setSearch] = useState(null);

    const tabs = [
        {
            title: 'Allgemein',
            content: <OerebGeneralInformation />,
            search: false
        },
        {
            title: 'Haftungsausschluss',
            content: <OerebMultilingualCatalog catalog="ExclusionOfLiability" search={search} />,
            search: true
        },
        {
            title: 'Glossar',
            content: <OerebMultilingualCatalog catalog="Glossary" search={search} />,
            search: true
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

    const handleSearch = function(evt) {
        setSearch(evt.target.value);
    }

    let searchInput = null;
    if (tabs[extract.tab].search) {
        if (document.body.offsetWidth < 1200) {
            searchInput =
                <div className="mt-2">
                    <input className="form-control"
                        placeholder="Begriff suchen..."
                        onChange={handleSearch} />
                </div>;
        }
        else {
            searchInput =
                <div className="ms-4">
                    <input className="form-control"
                        placeholder="Begriff suchen..."
                        onChange={handleSearch} />
                </div>;
        }
    }

    const nav = (() => {
        if (document.body.offsetWidth < 1200) {
            return (
                <div className="mb-4">
                    <div className="d-flex">
                        <ul className="nav nav-pills nav-justified flex-column">
                            {tabElements}
                        </ul>
                        <div className="flex-grow-1 text-end ms-4">
                            <button className="btn btn-outline-secondary text-body"
                                    onClick={togglePanel}>
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>
                    {searchInput}
                </div>
            );
        }
        return (
            <ul className="nav nav-tabs mb-4">
                {tabElements}
                {searchInput}
                <li className="nav-item ms-auto">
                    <button className="nav-link text-body" onClick={togglePanel}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </li>
            </ul>
        );
    })();

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
        <div ref={panel} className="oereb-client-information-panel container-fluid d-flex flex-column">
            {nav}
            <div className="flex-grow-1 content-wrapper">
                {content}
            </div>
        </div>
    );
};

export default OerebInformationPanel;
