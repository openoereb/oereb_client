import {render} from '@testing-library/react';
import React from "react";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebRealEstate from "../../../../oereb_client/static/src/component/real_estate/real_estate";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

describe('real estate component', () => {

  let component;

  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: 'de',
        available: ['de']
      }));
    });
    component = render(
      <Provider store={MainStore}>
        <OerebRealEstate data={extract.GetExtractByIdResponse.extract.RealEstate} />
      </Provider>
    );
  });

  it('should render real estate', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

});