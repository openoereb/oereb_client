import {mount} from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebUserGuide from "../../../../oereb_client/static/src/component/user_guide/user_guide";
import {update} from "../../../../oereb_client/static/src/reducer/config";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";

describe('user guide component', () => {

  let component;

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
    component = mount(
      <Provider store={MainStore}>
        <OerebUserGuide />
      </Provider>
    );
    window.open = jest.fn();
  });

  afterEach(() => {
    window.open.mockClear();
  });

  it('should render button', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should not render button', () => {
    act(() => {
      MainStore.dispatch(update({}));
    });
    const wrapper = mount(
      <Provider store={MainStore}>
        <OerebUserGuide />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call window.open', () => {
    component.find('button').simulate('click');
    expect(window.open.mock.calls).toHaveLength(1);
    expect(window.open.mock.calls[0][0]).toEqual('https://example.com/guide/de.pdf');
    expect(window.open.mock.calls[0][1]).toEqual('_blank');
    window.open.mockReset();
  });

});