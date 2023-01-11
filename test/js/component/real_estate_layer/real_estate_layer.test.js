import {render} from '@testing-library/react';
import {Map} from "ol";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from "ol/source/Vector";
import React from "react";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebRealEstateLayer from
  "../../../../oereb_client/static/src/component/real_estate_layer/real_estate_layer";
import {loadExtract, showExtract} from "../../../../oereb_client/static/src/reducer/extract";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

describe('real estate layer component', () => {

  let component;

  beforeEach(() => {
    const map = new Map();
    const layer = new VectorLayer({
      source: new VectorSource()
    });
    map.addLayer(layer);
    act(() => {
      MainStore.dispatch(loadExtract({
        egrid: 'CH1234',
        zoom: false
      }));
    });
    act(() => {
      MainStore.dispatch(showExtract(extract));
    });
    component = render(
      <Provider store={MainStore}>
        <OerebRealEstateLayer realEstateLayer={layer} map={map} />
      </Provider>
    );
  });

  it('should render real estate layer element', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

});