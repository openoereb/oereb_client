import {act, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  let user;

  beforeEach(() => {
    fetch.resetMocks();
    act(() => {
      MainStore.dispatch(initLanguages({
        default: 'de',
        available: ['de']
      }));
    });
    act(() => {
      MainStore.dispatch(update({
        service_url: 'http://example.com/',
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
    });
    const modal = document.createElement('div');
    modal.setAttribute('id', 'permalinkModal');
    const modalTitle = document.createElement('h5');
    const modalInput = document.createElement('input');
    modal.appendChild(modalTitle);
    modal.appendChild(modalInput);
    document.body.appendChild(modal);
    user = userEvent.setup();
  });

  it('should render loading message', () => {
    act(() => {
      MainStore.dispatch(loadExtract({
        egrid: 'CH1234',
        zoom: false
      }));
    });
    const component = render(
      <Provider store={MainStore}>
        <OerebExtract />
      </Provider>
    );
    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should render error message', async () => {
    act(() => {
      MainStore.dispatch(loadExtract({
        egrid: 'CH1234',
        zoom: false
      }));
    });
    act(() => {
      MainStore.dispatch(showError());
    });
    const component = render(
      <Provider store={MainStore}>
        <OerebExtract />
      </Provider>
    );
    expect(component.asFragment()).toMatchSnapshot();
    fetch.mockResponseOnce(JSON.stringify(extract));
    await user.click(component.container.querySelectorAll('button')[1]);
    expect(fetch.mock.calls).toHaveLength(1);
    const url = new URL(fetch.mock.calls[0][0]);
    expect(url.host).toEqual('example.com');
    expect(url.pathname).toEqual('/extract/json/');
    expect(url.searchParams.get('EGRID')).toEqual('CH1234');
  });

  it('should render extract data', () => {
    act(() => {
      MainStore.dispatch(loadExtract({
        egrid: 'CH1234',
        zoom: false
      }));
    });
    act(() => {
      MainStore.dispatch(showExtract(extract));
    });
    const component = render(
      <Provider store={MainStore}>
        <OerebExtract />
      </Provider>
    );
    expect(component.asFragment()).toMatchSnapshot();
  });

});