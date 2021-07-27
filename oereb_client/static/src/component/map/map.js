import './map.scss';

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadAt, show, hide } from '../../reducer/map_query';

import Map from 'ol/Map';
import View from 'ol/View';
import {defaults} from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';

import OerebMapQuery from '../map_query/map_query';
import { queryEgridByCoord } from '../../api/egrid';
import { queryExtractById } from '../../api/extract';

function OerebMap(props) {
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
            else {
                dispatch(hide());
            }
        })
        .catch((error) => {
            dispatch(hide());
        });
    });

    return (
        <div>
            <OerebMapQuery map={map} />
            <div ref={mapElement} class="oereb-client-map"></div>
        </div>
    );

}

function getBaseLayerSource(config) {
    if (config['type'].toLowerCase() === 'wms') {
        return getBaseLayerSourceWms(config);
    }
    else if (config['type'].toLowerCase() === 'wmts') {
        return getBaseLayerSourceWmts(config);
    }
    else {
        return Promise.reject('Invalid base layer type');
    }
}

function getBaseLayerSourceWms(config) {
    return Promise.resolve(new TileWMS({
        url: config['url'],
        params: config['params'],
        projection: 'EPSG:2056'
    }));
}

function getBaseLayerSourceWmts(config) {
    const parser = new WMTSCapabilities();
    return new Promise(function(resolve, reject) {
        fetch(config['url'])
        .then(response => response.text())
        .then((xml) => {
            const wmtsCaps = parser.read(xml);
            let wmtsOptions = {};
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
}

export default OerebMap;
