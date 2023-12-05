import {act, render} from '@testing-library/react';
import React from "react";
import {Provider} from "react-redux";

import OerebToggleBackground from "../../../../oereb_client/static/src/component/toggle_background/toggle_background";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";
import userEvent from '@testing-library/user-event';

describe('toggle background component', () => {

  let component;
  let user;

  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: 'de',
        available: ['de']
      }));
    });
    component = render(
      <Provider store={MainStore}>
        <OerebToggleBackground />
      </Provider>
    );
    user = userEvent.setup();
  });

  it('should render button', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should toggle state', async () => {
    await user.click(component.container.querySelector('button'));
    expect(component.asFragment()).toMatchSnapshot();
    await user.click(component.container.querySelector('button'));
    expect(component.asFragment()).toMatchSnapshot();
  });

});