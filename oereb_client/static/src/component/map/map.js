import './map.scss';
import OerebView from '../view/view';
import React from 'react';
import Map from 'ol/Map';

class OerebMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: new Map()
        }
    }

    componentDidMount() {
        this.state.map.setTarget(this._element);
    }

    render() {
        return (
            <div ref={el => (this._element = el)} class="oereb-client-map">
                <OerebView map={this.state.map} />
            </div>
        );
    }
}

export default OerebMap;
