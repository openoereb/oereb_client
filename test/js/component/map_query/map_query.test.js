import {mount} from "enzyme";
import toJson from "enzyme-to-json";
import {Map} from "ol";
import React from "react";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebMapQuery from "../../../../oereb_client/static/src/component/map_query/map_query";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import {loadAt, show} from "../../../../oereb_client/static/src/reducer/map_query";
import MainStore from "../../../../oereb_client/static/src/store/main";

describe('map query component', () => {

  const map = new Map();

  let component;

  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: 'de',
        available: ['de']
      }));
    });
    component = mount(
      <Provider store={MainStore}>
        <OerebMapQuery map={map} />
      </Provider>
    );
  });

  it('should render map query', () => {
    expect(toJson(component)).toMatchSnapshot();
    act(() => {
      MainStore.dispatch(loadAt({
        posX: 0.0,
        posY: 0.0
      }));
    });
    expect(toJson(component)).toMatchSnapshot();
    act(() => {
      MainStore.dispatch(show({
        results: [
          {
            egrid: 'CH0815',
            number: '0815',
            identDN: 'SAMPLE'
          },
          {
            egrid: 'CH1234',
            number: '1234',
            identDN: 'SAMPLE'
          }
        ]
      }));
    });
    expect(toJson(component)).toMatchSnapshot();
  });

});