import './map.scss';

import {defaults} from 'ol/control';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import TileWMS from 'ol/source/TileWMS';
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS';
import View from 'ol/View';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {queryEgridByCoord} from '../../api/egrid';
import {queryExtractById} from '../../api/extract';
import {loadExtract, showError, showExtract} from '../../reducer/extract';
import {hide, loadAt, show} from '../../reducer/map_query';
import OerebMapQuery from '../map_query/map_query';

const getBaseLayerSourceWms = function(config) {
    return Promise.resolve(new TileWMS({
        url: config['url'],
        params: config['params'],
        projection: 'EPSG:2056'
    }));
};

const getBaseLayerSourceWmts = function(config) {
    const parser = new WMTSCapabilities();
    return new Promise(function(resolve, reject) {
        fetch(config['url'])
        .then((response) => response.text())
        .then((xml) => {
            const wmtsCaps = parser.read(xml);
            const wmtsOptions = {};
            Object.entries(config).forEach(([key, value]) => {
                if (key !== 'url') {
                    wmtsOptions[key] = value;
                }
            });
            const wmtsConfig = optionsFromCapabilities(wmtsCaps, wmtsOptions);
            resolve(new WMTS(wmtsConfig));
        })
        .catch((error) => {
            reject(error);
        });
    });
};

const getBaseLayerSource = function(config) {
    if (config['type'].toLowerCase() === 'wms') {
        return getBaseLayerSourceWms(config);
    }
    else if (config['type'].toLowerCase() === 'wmts') {
        return getBaseLayerSourceWmts(config);
    }

        return Promise.reject(new Error('Invalid base layer type'));

};

const OerebMap = function() {
    const mapElement = useRef(null);
    const config = useSelector((state) => state.config).config;
    const dispatch = useDispatch();
    const query = new URLSearchParams(window.location.search);
    const applicationUrl = config.application_url;

    // Add view
    const mapX = parseFloat(query.get('map_x')) || config.view.map_x;
    const mapY = parseFloat(query.get('map_y')) || config.view.map_y;
    const mapZoom = parseFloat(query.get('map_zoom')) || config.view.map_zoom;
    const map = new Map({
        controls: defaults({
            attribution: false
        }),
        view: new View({
            center: [mapX, mapY],
            zoom: mapZoom,
            resolutions: config.view.resolutions,
            projection: 'EPSG:2056'
        })
    });

    // Add base layer
    getBaseLayerSource(config['base_layer']).then(function(source) {
        const baseLayer = new TileLayer({
            preload: Infinity,
            visible: true,
            source: source
        });
        map.addLayer(baseLayer);
    });

    useEffect(() => {
        map.setTarget(mapElement.current);
    });

    map.on('moveend', function() {
        const query = new URLSearchParams(window.location.search);
        query.set('map_x', map.getView().getCenter()[0].toFixed(3));
        query.set('map_y', map.getView().getCenter()[1].toFixed(3));
        query.set('map_zoom', map.getView().getZoom().toFixed(0));
        window.history.pushState(null, null, '?' + query.toString());
    });

    map.on('singleclick', function(evt) {
        const coord = map.getEventCoordinate(evt.originalEvent);
        dispatch(loadAt({
            posX: coord[0],
            posY: coord[1]
        }));
        queryEgridByCoord(applicationUrl, coord)
        .then((egrids) => {
            const results = egrids.GetEGRIDResponse;
            if (results.length > 1) {
                dispatch(show({
                    results: results
                }));
            }
            else if (results.length === 1) {
                const egrid = results[0].egrid;
                dispatch(hide());
                dispatch(loadExtract({
                    egrid: egrid
                }));
                queryExtractById(applicationUrl, egrid)
                .then((extract) => {
                    dispatch(showExtract({
                        extract: extract
                    }));
                })
                .catch(() => {
                    dispatch(showError());
                });
            }
            else {
                dispatch(hide());
            }
        })
        .catch(() => {
            dispatch(hide());
        });
    });

    return (
        <div>
            <OerebMapQuery map={map} />
            <div ref={mapElement} className="oereb-client-map"></div>
        </div>
    );

};

export default OerebMap;
