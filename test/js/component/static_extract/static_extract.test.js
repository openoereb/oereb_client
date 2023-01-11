import FileSaver from "file-saver";
import React from "react";
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebStaticExtract from
  "../../../../oereb_client/static/src/component/static_extract/static_extract";
import {update} from "../../../../oereb_client/static/src/reducer/config";
import {loadExtract, showExtract} from "../../../../oereb_client/static/src/reducer/extract";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

const sleep = function(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
};

describe('static extract component', () => {

  let component;
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
        service_url: 'http://example.com/pdf'
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
    component = render(
      <Provider store={MainStore}>
        <OerebStaticExtract />
      </Provider>
    );
    user = userEvent.setup();
  });

  it('should render static extract button', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should request static extract', async () => {
    const mockSave = jest.spyOn(FileSaver, 'saveAs');
    fetch.mockResponseOnce('foo');
    await user.click(component.container.querySelector('button'));
    await sleep(500);
    expect(fetch.mock.calls).toHaveLength(1);
    expect(mockSave).toHaveBeenCalled();
  });

});