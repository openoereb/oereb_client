import VectorLayer from 'ol/layer/Vector';
import React from "react";
import {render} from '@testing-library/react'
import {Provider} from "react-redux";

import OerebAvailabilityLayer from
  "../../../../oereb_client/static/src/component/availability_layer/availability_layer";
import MainStore from "../../../../oereb_client/static/src/store/main";

describe('availability layer component', () => {

  let component;

  beforeEach(() => {
    const layer = new VectorLayer();
    component = render(
      <Provider store={MainStore}>
        <OerebAvailabilityLayer availabilityLayer={layer} />
      </Provider>
    );
  });

  it('should render availability layer element', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

});