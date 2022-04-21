import {mount} from "enzyme";
import toJson from "enzyme-to-json";
import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';
import React from "react";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import App from "../../../../oereb_client/static/src/component/app/app";
import MainStore from "../../../../oereb_client/static/src/store/main";

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
      URL: 'http://example.com/logo_bl.png'
    }, {
      Language: 'de',
      URL: 'http://example.com/logo_bl.png'
    }, {
      Language: 'fr',
      URL: 'http://example.com/logo_bl.png'
    }],
    logo_oereb: [{
      Language: 'en',
      URL: 'http://example.com/logo_oereb_en.png'
    }, {
      Language: 'de',
      URL: 'http://example.com/logo_oereb_de.png'
    }, {
      Language: 'fr',
      URL: 'http://example.com/logo_oereb_fr.png'
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
    type: 'wms',
    url: 'http://example.com/wms',
    params: {
      LAYERS: 'base_layer',
      FORMAT: 'image/png'
    }
  },
  availability: {
    url: 'http://example.com/wms',
    params: {
      LAYERS: 'availability',
      FORMAT: 'image/png'
    }
  },
  mask_surrounding: {
    url: 'http://example.com/wms',
    params: {
      LAYERS: 'outside_bl_area',
      FORMAT: 'image/png'
    },
    opacity: 0.8
  },
  search: 'http://example.com/search',
  use_tile_wms: false
};

describe('app component', () => {

  let component;

  beforeEach(() => {
    proj4.defs(
      'EPSG:2056',
      '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 ' +
      '+ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs'
    );
    register(proj4);
    act(() => {
      component = mount(
        <Provider store={MainStore}>
          <App config={config} />
        </Provider>
      );
    });
  });

  it('should render app element', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

});
