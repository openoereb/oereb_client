import View from 'ol/View';
import { useSelector } from 'react-redux';

function OerebView(props) {
    const config = useSelector((state) => state.config).config;
    const query = new URLSearchParams(window.location.search);

    // Add view
    const mapX = parseFloat(query.get('map_x')) || config.view.map_x;
    const mapY = parseFloat(query.get('map_y')) || config.view.map_y;
    const mapZoom = parseFloat(query.get('map_zoom')) || config.view.map_zoom;
    const view = new View({
        center: [mapX, mapY],
        zoom: mapZoom,
        resolutions: config.view.resolutions,
        projection: 'EPSG:2056'
    });
    props.map.setView(view);

    return null;
}

export default OerebView;
