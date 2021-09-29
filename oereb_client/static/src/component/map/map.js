import './map.scss';

import {Collection} from 'ol';
import {defaults} from 'ol/control';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import TileWMS from 'ol/source/TileWMS';
import VectorSource from 'ol/source/Vector';
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import View from 'ol/View';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {queryEgridByCoord} from '../../api/egrid';
import {queryExtractById} from '../../api/extract';
import {loadExtract, showError, showExtract} from '../../reducer/extract';
import {updateHistory} from '../../reducer/history';
import {initMap} from '../../reducer/map';
import {hide, loadAt, show} from '../../reducer/map_query';
import OerebAvailabilityLayer from '../availability_layer/availability_layer';
import OerebMapQuery from '../map_query/map_query';
import OerebRealEstateLayer from '../real_estate_layer/real_estate_layer';
import OerebTopicLayer from '../topic_layers/topic_layers';

const getBaseLayerSourceWms = function (config) {
  return Promise.resolve(new TileWMS({
    url: config['url'],
    params: config['params'],
    projection: 'EPSG:2056'
  }));
};

const getBaseLayerSourceWmts = function (config) {
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
        resolve(new WMTS(wmtsConfig));
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getBaseLayerSource = function (config) {
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
  const applicationUrl = config.application_url;
  const [map, setMap] = useState(null);

  // Create availability layer
  const [availabilityLayer] = useState(new TileLayer({
    preload: Infinity,
    source: new TileWMS({
      url: config.availability.url,
      params: config.availability.params
    })
  }));

  // Create group for topic layers
  const [topicLayers] = useState(new LayerGroup({
    layers: new Collection([]),
    visible: false
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
    })
  }));

  if (map === null) {

    // Add view
    const mapX = parseFloat(query.get('map_x')) || config.view.map_x;
    const mapY = parseFloat(query.get('map_y')) || config.view.map_y;
    const mapZoom = parseFloat(query.get('map_zoom')) || config.view.map_zoom;

    const newMap = new Map({
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
    getBaseLayerSource(config['base_layer']).then(function (source) {
      const baseLayer = new TileLayer({
        preload: Infinity,
        visible: true,
        source: source
      });
      newMap.addLayer(baseLayer);
      newMap.addLayer(availabilityLayer);
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
              egrid: egrid,
              zoom: false
            }));
            queryExtractById(applicationUrl, egrid, currentLanguage)
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

  return (
    <div>
      <OerebMapQuery map={map} />
      <OerebRealEstateLayer map={map} realEstateLayer={realEstateLayer} />
      <OerebTopicLayer topicLayers={topicLayers} />
      <OerebAvailabilityLayer availabilityLayer={availabilityLayer} />
      <div ref={mapElement} className="oereb-client-map"></div>
    </div>
  );

};

export default OerebMap;
