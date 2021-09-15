import './map_query.scss';

import Overlay from 'ol/Overlay';
import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {queryExtractById} from '../../api/extract';
import {setViewServices} from '../../reducer/accordion';
import {loadExtract, showError, showExtract} from '../../reducer/extract';
import {updateHistory} from '../../reducer/history';
import {hide} from '../../reducer/map_query';

const OerebMapQuery = function(props) {
    const dispatch = useDispatch();
    const config = useSelector((state) => state.config).config;
    const mapQuery = useSelector((state) => state.mapQuery);
    const mapQueryElement = useRef(null);

    const applicationUrl = config.application_url;
    const map = props.map;

    const overlay = new Overlay({
        element: mapQueryElement.current,
        autoPan: true,
        offset: [-17, -17]
    });
    map.addOverlay(overlay);
    overlay.setPosition([mapQuery.posX, mapQuery.posY]);

    const close = function() {
        dispatch(hide());
    };

    const queryExtract = function(egrid) {
        dispatch(hide());
        dispatch(setViewServices([]));
        dispatch(loadExtract(egrid));
        queryExtractById(applicationUrl, egrid)
        .then((extract) => {
            dispatch(showExtract(extract));
            dispatch(updateHistory(extract));
        })
        .catch(() => {
            dispatch(showError());
        });
    };

    const listResults = mapQuery.results.map((result, key) => {
        const number = result.number;
        const egrid = result.egrid;
        return (
            <button key={key}
                    onClick={queryExtract.bind(this, egrid)}
                    type="button"
                    className="list-group-item list-group-item-action">
                <small>Auszug für Grundstück {number}</small>
            </button>
        );
    });

    if (mapQuery.loading) {
        return (
            <div className="oereb-client-overlay" ref={mapQueryElement}>
                <div className="loader">
                    <div className="spinner-grow"></div>
                </div>
            </div>
        );
    }
    else if (mapQuery.visible) {
        return (
            <div className="oereb-client-overlay" ref={mapQueryElement}>
                <div className="results">
                    <div className="background-icon"></div>
                    <div className="content list-group">
                        <button onClick={close} type="button" className="list-group-item list-group-item-action text-end">
                            <strong className="bi bi-x"></strong>
                        </button>
                        {listResults}
                    </div>
                    <div className="icon">
                        <div className="icon-outer">
                            <div className="icon-inner"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

        return (
            <div className="oereb-client-overlay" ref={mapQueryElement}></div>
        );

};

OerebMapQuery.propTypes = {
    map: PropTypes.object.isRequired
};

export default OerebMapQuery;
