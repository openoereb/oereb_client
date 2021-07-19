import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import { useSelector } from 'react-redux';

function OerebView(props) {
    const config = useSelector((state) => state.config).config;

    // Add view
    const mapX = config.view.map_x;
    const mapY = config.view.map_y;
    const mapZoom = config.view.map_zoom;
    const view = new View({
        center: [mapX, mapY],
        zoom: mapZoom,
        resolutions: config.view.resolutions,
        projection: 'EPSG:2056'
    });
    props.map.setView(view);

    // Add base layer
    getBaseLayerSource(config['base_layer']).then(function(source) {
        const baseLayer = new TileLayer({
            preload: Infinity,
            visible: true,
            source: source
        });
        props.map.addLayer(baseLayer);
    });

    console.log(config);
    return null;
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

export default OerebView;