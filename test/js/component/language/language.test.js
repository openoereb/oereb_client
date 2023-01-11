import React from "react";
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebLanguage from "../../../../oereb_client/static/src/component/language/language";
import {hideExtract} from "../../../../oereb_client/static/src/reducer/extract";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";

describe('language component', () => {

  let component;
  let user;

  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: 'de',
        available: ['en', 'de']
      }));
    });
    component = render(
      <Provider store={MainStore}>
        <OerebLanguage />
      </Provider>
    );
    user = userEvent.setup();
  });

  it('should show selected language', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should update the selected language', async () => {
    act(() => {
      MainStore.dispatch(hideExtract());
    });
    await user.click(component.container.querySelectorAll('.dropdown-item')[0]);
    expect(MainStore.getState().language.current).toEqual('en');
    expect(component.asFragment()).toMatchSnapshot();
  });

});