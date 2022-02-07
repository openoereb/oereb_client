import {mount} from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebLanguage from "../../../../oereb_client/static/src/component/language/language";
import {hideExtract} from "../../../../oereb_client/static/src/reducer/extract";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";

describe('language component', () => {

  let component;

  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: 'de',
        available: ['en', 'de']
      }));
    });
    component = mount(
      <Provider store={MainStore}>
        <OerebLanguage />
      </Provider>
    );
  });

  it('should show selected language', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should update the selected language', () => {
    act(() => {
      MainStore.dispatch(hideExtract());
    });
    act(() => {
      component.find('.dropdown-item').at(0).simulate('click');
    });
    component.update();
    expect(MainStore.getState().language.current).toEqual('en');
    expect(toJson(component)).toMatchSnapshot();
  });

});