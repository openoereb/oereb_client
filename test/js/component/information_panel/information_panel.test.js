import {mount} from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebInformationPanel
  from "../../../../oereb_client/static/src/component/information_panel/information_panel";
import {
  loadExtract,
  setInformationPanelTab,
  showExtract
} from "../../../../oereb_client/static/src/reducer/extract";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

beforeEach(() => {
  act(() => {
    MainStore.dispatch(initLanguages({
      default: 'de',
      available: ['de']
    }));
  });
  act(() => {
    MainStore.dispatch(loadExtract({
      egrid: 'CH1234',
      zoom: false
    }));
  });
  act(() => {
    MainStore.dispatch(showExtract(extract));
  });
});

describe('information panel component', () => {

  let component;

  beforeEach(() => {
    component = mount(
      <Provider store={MainStore}>
        <OerebInformationPanel />
      </Provider>
    );
  });

  it('should render general information', () => {
    act(() => {
      MainStore.dispatch(setInformationPanelTab(0));
    });
    component.update();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render disclaimer', () => {
    act(() => {
      MainStore.dispatch(setInformationPanelTab(1));
    });
    component.update();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render glossary', () => {
    act(() => {
      MainStore.dispatch(setInformationPanelTab(2));
    });
    component.update();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should filter glossary results', () => {
    act(() => {
      MainStore.dispatch(setInformationPanelTab(2));
    });
    component.update();
    component.find('input').simulate('change', {target: {value: 'kbs'}});
    component.update();
    expect(toJson(component)).toMatchSnapshot();
  });

});