import {isArray, isObject, isString} from 'lodash';
import proj4 from 'proj4';

import {getLocalizedText} from './language';

export const getViewServiceDefinition = function (mapObject, currentLanguage, defaultLanguage) {
  const parts = getLocalizedText(
    mapObject['ReferenceWMS'],
    currentLanguage,
    defaultLanguage
  ).split('?');
  const url = parts[0];
  const definition = {
    'url': url,
    'params': {},
    'opacity': mapObject['layerOpacity'],
    'zIndex': 21000 + mapObject['layerIndex']
  };
  const hasNS95 = isObject(mapObject['min_NS95']) && isObject(mapObject['max_NS95']);
  const hasNS03 = isObject(mapObject['min_NS03']) && isObject(mapObject['max_NS03']);
  if (hasNS95 || hasNS03) {
    const minNS = hasNS95 ? mapObject['min_NS95'] : mapObject['min_NS03'];
    const maxNS = hasNS95 ? mapObject['max_NS95'] : mapObject['max_NS03'];
    let minCoords = minNS['coordinates'];
    let maxCoords = maxNS['coordinates'];
    if (
      isArray(minCoords) && minCoords.length === 2 &&
      isArray(maxCoords) && maxCoords.length === 2
    ) {
      if (isString(minNS['crs'])) {
        minCoords = proj4(minNS['crs'], 'EPSG:2056', minCoords);
      }
      if (isString(maxNS['crs'])) {
        maxCoords = proj4(maxNS['crs'], 'EPSG:2056', maxCoords);
      }
      definition['extent'] = [
        Math.round(minCoords[0] * 100) / 100,
        Math.round(minCoords[1] * 100) / 100,
        Math.round(maxCoords[0] * 100) / 100,
        Math.round(maxCoords[1] * 100) / 100
      ];
    }
  }
  const params = parts[1].split('&');
  for (let i = 0; i < params.length; i++) {
    const wmsParams = [
      'SERVICE',
      'VERSION',
      'REQUEST',
      'FORMAT',
      'CRS',
      'SRS',
      'LAYERS',
      'STYLES',
      'BBOX',
      'WIDTH',
      'HEIGHT',
      'TRANSPARENT'
    ];
    const param = params[i].split('=');
    const key = param[0];
    const value = param[1];
    if (wmsParams.indexOf(key.toUpperCase()) > -1) {
      definition['params'][key.toUpperCase()] = decodeURIComponent(value);
    }
    else {
      definition['params'][key] = value;
    }
  }
  return definition;
};
