import React from "react";
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebUserGuide from "../../../../oereb_client/static/src/component/user_guide/user_guide";
import {update} from "../../../../oereb_client/static/src/reducer/config";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";
import { async } from "regenerator-runtime";

describe('user guide component', () => {

  let component;
  let user;

  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: 'de',
        available: ['de']
      }));
    });
    act(() => {
      MainStore.dispatch(update({
        user_guide: 'https://example.com/guide/{lang}.pdf'
      }));
    });
    component = render(
      <Provider store={MainStore}>
        <OerebUserGuide />
      </Provider>
    );
    user = userEvent.setup();
    window.open = jest.fn();
  });

  afterEach(() => {
    window.open.mockClear();
  });

  it('should render button', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should not render button', () => {
    act(() => {
      MainStore.dispatch(update({}));
    });
    const wrapper = render(
      <Provider store={MainStore}>
        <OerebUserGuide />
      </Provider>
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should call window.open', async () => {
    await user.click(component.container.querySelector('button'));
    expect(window.open.mock.calls).toHaveLength(1);
    expect(window.open.mock.calls[0][0]).toEqual('https://example.com/guide/de.pdf');
    expect(window.open.mock.calls[0][1]).toEqual('_blank');
    window.open.mockReset();
  });

});