import './map.scss';

import {isArray, isObject, isString} from 'lodash';
import {Collection} from 'ol';
import {Attribution, defaults} from 'ol/control';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import LayerGroup from 'ol/layer/Group';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import ImageWMS from 'ol/source/ImageWMS';
import TileWMS from 'ol/source/TileWMS';
import VectorSource from 'ol/source/Vector';
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import View from 'ol/View';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {loadExtract, showError, showExtract} from '../../reducer/extract';
import {updateHistory} from '../../reducer/history';
import {initMap} from '../../reducer/map';
import {hide, loadAt, show} from '../../reducer/map_query';
import {queryEgridByCoord} from '../../request/egrid';
import {queryExtractById} from '../../request/extract';
import OerebAvailabilityLayer from '../availability_layer/availability_layer';
import OerebMapQuery from '../map_query/map_query';
import OerebRealEstateLayer from '../real_estate_layer/real_estate_layer';
import OerebTopicLayer from '../topic_layers/topic_layers';

export const getBaseLayerSourceWms = function (config) {
  const wmsConfig = {
    url: config['url'],
    params: config['params'],
    projection: 'EPSG:2056'
  };
  if (isString(config['attributions']) || isArray(config['attributions'])) {
    wmsConfig['attributions'] = config['attributions'];
  }
  return Promise.resolve(new TileWMS(wmsConfig));
};

export const getBaseLayerSourceWmts = function (config) {
  const parser = new WMTSCapabilities();
  return new Promise(function (resolve, reject) {
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
        if (isString(config['attributions']) || isArray(config['attributions'])) {
          wmtsConfig['attributions'] = config['attributions'];
        }
        resolve(new WMTS(wmtsConfig));
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getBaseLayerSource = function (config) {
  if (config['type'].toLowerCase() === 'wms') {
    return getBaseLayerSourceWms(config);
  }
  else if (config['type'].toLowerCase() === 'wmts') {
    return getBaseLayerSourceWmts(config);
  }
  return Promise.reject(new Error('Invalid base layer type'));
};

const OerebMap = function () {
  const mapElement = useRef(null);
  const config = useSelector((state) => state.config).config;
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const serviceUrl = config.service_url;
  const [map, setMap] = useState(null);
  const tiled = config['use_tile_wms'];

  let LayerClass = ImageLayer;
  let SourceClass = ImageWMS;
  if (tiled) {
    LayerClass = TileLayer;
    SourceClass = TileWMS;
  }

  // Create availability layer
  const availabilityConfig = {
    preload: Infinity,
    source: new SourceClass({
      url: config.availability.url,
      params: config.availability.params
    }),
    zIndex: 10000
  };
  if (isString(config.availability['attributions']) || isArray(config.availability['attributions'])) {
    availabilityConfig['attributions'] = config.availability['attributions'];
  }
  const [availabilityLayer] = useState(new LayerClass(availabilityConfig));

  // Create mask_surrounding layer
  let maskSurroundingLayerObject = null;
  if (isObject(config.mask_surrounding)) {
    const maskSurroundingConfig = {
      preload: Infinity,
      source: new SourceClass({
        url: config.mask_surrounding.url,
        params: config.mask_surrounding.params
      }),
      opacity: config.mask_surrounding.opacity,
      zIndex: 40000
    };
    if (
      isString(config.mask_surrounding['attributions']) ||
      isArray(config.mask_surrounding['attributions'])
    ) {
      maskSurroundingConfig['attributions'] = config.mask_surrounding['attributions'];
    }
    maskSurroundingLayerObject = new LayerClass(maskSurroundingConfig);
  }
  const [maskSurroundingLayer] = useState(maskSurroundingLayerObject);

  // Create group for topic layers
  const [topicLayers] = useState(new LayerGroup({
    layers: new Collection([]),
    visible: false,
    zIndex: 20000
  }));

  // Create real estate layer
  const [realEstateLayer] = useState(new VectorLayer({
    source: new VectorSource({}),
    style: new Style({
      fill: undefined,
      stroke: new Stroke({
        color: [255, 0, 0, 0.75],
        width: 7,
        lineCap: 'square',
        lineJoin: 'miter'
      })
    }),
    zIndex: 30000
  }));

  if (map === null) {

    // Add view
    const mapX = parseFloat(query.get('map_x')) || config.view.map_x;
    const mapY = parseFloat(query.get('map_y')) || config.view.map_y;
    const mapZoom = parseFloat(query.get('map_zoom')) || config.view.map_zoom;

    // Add attribution
    const attribution = new Attribution({
      collapsible: document.body.offsetWidth < 1200
    });

    const newMap = new Map({
      controls: defaults({
        attribution: false
      }).extend([attribution]),
      view: new View({
        center: [mapX, mapY],
        zoom: mapZoom,
        resolutions: config.view.resolutions,
        projection: 'EPSG:2056'
      })
    });

    // Add base layer
    getBaseLayerSource(config['base_layer']).then(function (source) {
      const baseLayer = new TileLayer({
        preload: Infinity,
        visible: true,
        source: source,
        zIndex: 0
      });
      newMap.addLayer(baseLayer);
      newMap.addLayer(availabilityLayer);
      if (maskSurroundingLayer !== null) {
        newMap.addLayer(maskSurroundingLayer);
      }
      newMap.addLayer(topicLayers);
      newMap.addLayer(realEstateLayer);
      dispatch(initMap({
        map: newMap,
        topicLayers: topicLayers
      }));
    });

    newMap.on('moveend', function () {
      const query = new URLSearchParams(window.location.search);
      query.set('map_x', newMap.getView().getCenter()[0].toFixed(3));
      query.set('map_y', newMap.getView().getCenter()[1].toFixed(3));
      query.set('map_zoom', newMap.getView().getZoom().toFixed(0));
      window.history.pushState(null, null, '?' + query.toString());
    });

    newMap.on('singleclick', function (evt) {
      const coord = newMap.getEventCoordinate(evt.originalEvent);
      dispatch(loadAt({
        posX: coord[0],
        posY: coord[1]
      }));
      queryEgridByCoord(serviceUrl, coord)
        .then((egrids) => {
          const results = egrids.GetEGRIDResponse;
          if (results.length > 1) {
            dispatch(show({
              results: results
            }));
          }
          else if (results.length === 1) {
            const egrid = results[0].egrid;
            const identdn = results[0].identDN;
            const number = results[0].number;
            dispatch(hide());
            dispatch(loadExtract({
              egrid: egrid,
              identdn: identdn,
              number: number,
              zoom: false
            }));
            queryExtractById(serviceUrl, egrid, identdn, number, config.extract_json_timeout, currentLanguage)
              .then((extract) => {
                dispatch(showExtract(extract));
                dispatch(updateHistory(extract));
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

    setMap(newMap);
  }

  useEffect(() => {
    map.setTarget(mapElement.current);
  });

  let mapQueryComponent = null;
  let realEstateLayerComponent = null;
  let topicLayerComponent = null;
  let availabilityLayerComponent = null;
  if (map instanceof Map) {
    mapQueryComponent = <OerebMapQuery map={map} />;
    realEstateLayerComponent = <OerebRealEstateLayer map={map} realEstateLayer={realEstateLayer} />;
    topicLayerComponent = <OerebTopicLayer topicLayers={topicLayers} tiled={tiled} />;
    availabilityLayerComponent = <OerebAvailabilityLayer availabilityLayer={availabilityLayer} />;
  }

  return (
    <div className="oereb-client-map-wrapper">
      {mapQueryComponent}
      {realEstateLayerComponent}
      {topicLayerComponent}
      {availabilityLayerComponent}
      <div ref={mapElement} className="oereb-client-map"></div>
    </div>
  );

};

export default OerebMap;
