import {mount} from "enzyme";
import toJson from "enzyme-to-json";
import VectorLayer from 'ol/layer/Vector';
import React from "react";
import {Provider} from "react-redux";

import OerebAvailabilityLayer from
  "../../../../oereb_client/static/src/component/availability_layer/availability_layer";
import MainStore from "../../../../oereb_client/static/src/store/main";

describe('availability layer component', () => {

  let component;

  beforeEach(() => {
    const layer = new VectorLayer();
    component = mount(
      <Provider store={MainStore}>
        <OerebAvailabilityLayer availabilityLayer={layer} />
      </Provider>
    );
  });

  it('should render availability layer element', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

});