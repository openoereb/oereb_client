import './oereb_client.scss';
import './i18n';

import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './component/app/app';
import MainStore from './store/main';

// Define LV95 projection
proj4.defs(
  'EPSG:2056',
  '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 ' +
  '+ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs'
);

// Define LV03 projection
proj4.defs(
  'EPSG:21781',
  '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 ' +
  '+ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs'
);

register(proj4);

ReactDOM.render(
  <Provider store={MainStore}>
    <App config={JSON.parse(document.getElementById('config').textContent)} />
  </Provider>,
  document.getElementById('app')
);
