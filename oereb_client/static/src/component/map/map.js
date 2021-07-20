import './map.scss';
import OerebView from '../view/view';
import OerebBaseLayer from '../base_layer/base_layer';
import React from 'react';
import Map from 'ol/Map';
import {defaults} from 'ol/control';

class OerebMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: new Map({
                controls: defaults({
                    attribution: false
                })
            })
        }
    }

    componentDidMount() {
        this.state.map.setTarget(this._element);
        this.state.map.on('moveend', function() {
            this.updateUrlParams();
        }.bind(this));
    }

    render() {
        return (
            <div ref={el => (this._element = el)} class="oereb-client-map">
                <OerebView map={this.state.map} />
                <OerebBaseLayer map={this.state.map} />
            </div>
        );
    }

    updateUrlParams() {
        const query = new URLSearchParams(window.location.search);
        query.set('map_x', this.state.map.getView().getCenter()[0].toFixed(3));
        query.set('map_y', this.state.map.getView().getCenter()[1].toFixed(3));
        query.set('map_zoom', this.state.map.getView().getZoom().toFixed(0));
        window.history.pushState(null, null, '?' + query.toString());
    }
}

export default OerebMap;
