import {act, render} from '@testing-library/react';
import React from "react";
import {Provider} from "react-redux";

import OerebMessage from "../../../../oereb_client/static/src/component/message/message";
import MainStore from "../../../../oereb_client/static/src/store/main";
import { error, warning } from '../../../../oereb_client/static/src/reducer/message';

describe('message component', () => {

  let component;

  beforeEach(() => {
    component = render(
      <Provider store={MainStore}>
        <OerebMessage />
      </Provider>
    );
  });

  it('should render message container', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should render warning message', () => {
    act(() => {
      MainStore.dispatch(warning('foo'));
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should render error message', () => {
    act(() => {
      MainStore.dispatch(error('foo'));
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

});