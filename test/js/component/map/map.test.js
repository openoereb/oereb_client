import {act, render} from '@testing-library/react';
import {register} from "ol/proj/proj4";
import TileWMS from 'ol/source/TileWMS';
import WMTS from 'ol/source/WMTS';
import proj4 from "proj4";
import React from "react";
import {Provider} from "react-redux";

import OerebMap, {
  getBaseLayerSourceWms,
  getBaseLayerSourceWmts
} from "../../../../oereb_client/static/src/component/map/map";
import {update} from "../../../../oereb_client/static/src/reducer/config";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";
import capabilities from "./assets/capabilities";

const config = {
  view: {
    center: [2615000.0, 1255000.0],
    zoom: 2,
    resolutions: [250, 100, 50, 20, 10],
    projection: 'EPSG:2056'
  },
  base_layer: {
    type: 'wms',
    url: 'http://example.com/wms',
    params: {
      LAYERS: 'baselayer'
    }
  },
  availability: {
    url: 'http://example.com/wms',
    params: {
      LAYERS: 'availability'
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
  use_tile_wms: false
};

beforeEach(() => {
  fetch.resetMocks();
  proj4.defs(
    'EPSG:2056',
    '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 ' +
    '+ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs'
  );
  register(proj4);
});

describe('map component', () => {

  let component;

  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: 'de',
        available: ['de']
      }));
    });
    act(() => {
      MainStore.dispatch(update(config));
    });
    component = render(
      <Provider store={MainStore}>
        <OerebMap />
      </Provider>
    );
  });

  it('should render map', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

});

describe('getBaseLayerSourceWms', () => {

  it('should return the WMS source', async () => {
    const source = await getBaseLayerSourceWms({
      url: 'http://example.com/wms',
      params: {
        LAYERS: 'grundkarte_farbig',
        FORMAT: 'image/png'
      },
      projection: 'EPSG:2056',
      attributions: 'baselayer wms'
    });
    expect(source).toBeInstanceOf(TileWMS);
    expect(source.getParams()['LAYERS']).toEqual('grundkarte_farbig');
    expect(source.getParams()['FORMAT']).toEqual('image/png');
    expect(source.getProjection().getCode()).toEqual('EPSG:2056');
    expect(source.getAttributions()()[0]).toEqual('baselayer wms');
  });

});

describe('getBaseLayerSourceWmts', () => {

  it('should return the WMTS source', async () => {
    fetch.mockResponseOnce(capabilities);
    const source = await getBaseLayerSourceWmts({
      url: 'http://example.com/wmts',
      layer: 'grundkarte_farbig',
      matrixSet: 'swissgrid',
      projection: 'EPSG:2056',
      style: 'default',
      format: 'image/png',
      attributions: 'baselayer wmts'
    });
    expect(source).toBeInstanceOf(WMTS);
    expect(source.getLayer()).toEqual('grundkarte_farbig');
    expect(source.getMatrixSet()).toEqual('swissgrid');
    expect(source.getProjection().getCode()).toEqual('EPSG:2056');
    expect(source.getStyle()).toEqual('default');
    expect(source.getFormat()).toEqual('image/png');
    expect(source.getAttributions()()[0]).toEqual('baselayer wmts');
    expect(fetch.mock.calls).toHaveLength(1);
  });

});
