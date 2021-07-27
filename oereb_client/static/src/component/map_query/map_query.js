import './map_query.scss';

import Overlay from 'ol/Overlay';

import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hide } from '../../reducer/map_query';
import { loadExtract, showExtract, showError } from '../../reducer/extract';
import { queryExtractById } from '../../api/extract';

function OerebMapQuery(props) {
    const config = useSelector((state) => state.config).config;
    const applicationUrl = config.application_url;
    const mapQuery = useSelector((state) => state.mapQuery);
    const dispatch = useDispatch();
    const mapQueryElement = useRef(null);
    const map = props.map;
    const overlay = new Overlay({
        element: mapQueryElement.current,
        autoPan: true,
        offset: [-17, -17]
    });
    map.addOverlay(overlay);
    overlay.setPosition([mapQuery.posX, mapQuery.posY]);

    const listResults = mapQuery.results.map((result) => {
        const number = result.number;
        const egrid = result.egrid;
        return (
            <button onClick={queryExtract.bind(this, egrid)}
                    type="button"
                    class="list-group-item list-group-item-action">
                <small>Auszug für Grundstück {number}</small>
            </button>
        );
    });

    function close() {
        dispatch(hide());
    }

    function queryExtract(egrid) {
        dispatch(hide());
        dispatch(loadExtract());
        queryExtractById(applicationUrl, egrid)
        .then((extract) => {
            dispatch(showExtract({
                extract: extract
            }));
        })
        .catch((error) => {
            dispatch(showError());
        });
    }

    if (mapQuery.loading) {
        return (
            <div class="oereb-client-overlay" ref={mapQueryElement}>
                <div class="loader">
                    <div class="spinner-grow"></div>
                </div>
            </div>
        );
    }
    else if (mapQuery.visible) {
        return (
            <div class="oereb-client-overlay" ref={mapQueryElement}>
                <div class="results">
                    <div class="background-icon"></div>
                    <div class="content list-group">
                        <button onClick={close} type="button" class="list-group-item list-group-item-action text-end">
                            <strong class="bi bi-x"></strong>
                        </button>
                        {listResults}
                    </div>
                    <div class="icon">
                        <div class="icon-outer">
                            <div class="icon-inner"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div class="oereb-client-overlay" ref={mapQueryElement}></div>
        );
    }

    // return (
    //     <div id="oereb-map-query">
    //         <div class="loader-bg"></div>
    //         <div class="content" ng-show="contentVisible">
    //             <div class="list-group">
    //                 <button type="button" class="list-group-item" ng-click="close()">
    //                     <span class="pull-right"><strong>&times;</strong></span>
    //                 </button>
    //                 <button type="button"
    //                         class="list-group-item"
    //                         ng-repeat="re in realEstate"
    //                         ng-click="select(re.egrid)">
    //                     Auszug f&uuml;r Grundst&uuml;ck {{re.number}}
    //                 </button>
    //             </div>
    //         </div>
    //         <div class="loader" ng-show="!contentVisible">
    //             <i class="fa fa-spinner fa-pulse fa-2x"></i>
    //         </div>
    //         <div class="icon" ng-show="contentVisible">
    //             <div class="icon-outer">
    //                 <div class="icon-inner"></div>
    //             </div>
    //         </div>
    //     </div>
    // );
}

export default OerebMapQuery;
