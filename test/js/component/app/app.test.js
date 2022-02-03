import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';
import React from "react";
import {Provider} from "react-redux";
import renderer from "react-test-renderer";

import App from "../../../../oereb_client/static/src/component/app/app";
import MainStore from "../../../../oereb_client/static/src/store/main";

beforeEach(() => {
  proj4.defs(
    'EPSG:2056',
    '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 ' +
    '+ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs'
  );
  register(proj4);
});

describe('app component', () => {
  const config = {
    application: {
      title: [{
        Language: 'en',
        Text: 'PLR Cadastre, Canton of Basel-Landschaft'
      }, {
        Language: 'de',
        Text: 'ÖREB-Kataster, Kanton Basel-Landschaft'
      }, {
        Language: 'fr',
        Text: 'Cadastre RDPPF, Canton de Bâle-Campagne'
      }],
      logo_canton: [{
        Language: 'en',
        URL: 'http://localhost:8080/samples/static/logo_bl.png'
      }, {
        Language: 'de',
        URL: 'http://localhost:8080/samples/static/logo_bl.png'
      }, {
        Language: 'fr',
        URL: 'http://localhost:8080/samples/static/logo_bl.png'
      }],
      logo_oereb: [{
        Language: 'en',
        URL: 'http://localhost:8080/samples/static/logo_oereb_en.png'
      }, {
        Language: 'de',
        URL: 'http://localhost:8080/samples/static/logo_oereb_de.png'
      }, {
        Language: 'fr',
        URL: 'http://localhost:8080/samples/static/logo_oereb_fr.png'
      }],
      local_storage_prefix: 'bl',
      languages: ['en', 'de', 'fr'],
      default_language: 'en'
    },
    view: {
      map_x: 2615000,
      map_y: 1255000,
      map_zoom: 2,
      resolutions: [250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5, 0.25, 0.1, 0.05, 0.025, 0.01]
    },
    base_layer: {
      type: 'wmts',
      url: 'https://tile.geoview.bl.ch/1.0.0/WMTSCapabilities.xml',
      layer: 'grundkarte_sw',
      matrixSet: 'swissgrid',
      projection: "EPSG:2056",
      style: 'default',
      format: 'image/png'
    },
    availability: {
      url: 'https://geoview.bl.ch/main/oereb/mapservproxy',
      params: {
        LAYERS: 'oereb_published_municipalities',
        FORMAT: 'image/png'
      }
    },
    search: 'http://example.com/search'
  };

  it('should render app element', () => {
    const component = renderer.create(
      <Provider store={MainStore}>
        <App config={config} />
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
