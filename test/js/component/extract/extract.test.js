import {mount} from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import {Provider} from "react-redux";

import OerebExtract from "../../../../oereb_client/static/src/component/extract/extract";
import {update} from "../../../../oereb_client/static/src/reducer/config";
import {
  loadExtract,
  showError,
  showExtract
} from "../../../../oereb_client/static/src/reducer/extract";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

describe('extract component', () => {

  beforeEach(() => {
    MainStore.dispatch(initLanguages({
      default: 'de',
      available: ['de']
    }));
    MainStore.dispatch(update({
      support: {
        office1: [{
          Language: 'de',
          Text: 'Amt für Geoinformation'
        }],
        office2: [{
          Language: 'de',
          Text: 'GIS-Fachstelle'
        }],
        street: 'Mühlemattstrasse 36',
        city: '4410 Liestal',
        email: 'support.gis@bl.ch',
        phone: '061 552 56 73'
      }
    }));
    const modal = document.createElement('div');
    modal.setAttribute('id', 'permalinkModal');
    const modalTitle = document.createElement('h5');
    const modalInput = document.createElement('input');
    modal.appendChild(modalTitle);
    modal.appendChild(modalInput);
    document.body.appendChild(modal);
  });

  it('should render loading message', () => {
    MainStore.dispatch(loadExtract({
      egrid: 'CH1234',
      zoom: false
    }));
    const component = mount(
      <Provider store={MainStore}>
        <OerebExtract />
      </Provider>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render error message', () => {
    MainStore.dispatch(showError());
    const component = mount(
      <Provider store={MainStore}>
        <OerebExtract />
      </Provider>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render extract data', () => {
    MainStore.dispatch(loadExtract({
      egrid: 'CH1234',
      zoom: false
    }));
    MainStore.dispatch(showExtract(extract));
    const component = mount(
      <Provider store={MainStore}>
        <OerebExtract />
      </Provider>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

});