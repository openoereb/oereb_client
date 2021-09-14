import {isArray, isObject, isString} from 'lodash';
import proj4 from 'proj4';

export const getViewServiceDefinition = function(mapObject) {
    const parts = mapObject['ReferenceWMS'].split('?');
    const url = parts[0];
    const definition = {
        'url': url,
        'params': {},
        'opacity': mapObject['layerOpacity'],
        'zIndex': mapObject['layerIndex']
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
        const param = params[i].split('=');
        if (param[0].toUpperCase() === 'LAYERS') {
            definition['params']['LAYERS'] = decodeURIComponent(param[1]);
        }
        else if (param[0].toUpperCase() === 'STYLES') {
            definition['params']['STYLES'] = decodeURIComponent(param[1]);
        }
        else if (param[0].toUpperCase() === 'VERSION') {
            definition['params']['VERSION'] = decodeURIComponent(param[1]);
        }
        else if (param[0].toUpperCase() === 'FORMAT') {
            definition['params']['FORMAT'] = decodeURIComponent(param[1]);
        }
    }
    return definition;
};
