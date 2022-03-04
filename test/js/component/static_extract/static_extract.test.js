import {mount} from "enzyme";
import toJson from "enzyme-to-json";
import FileSaver from "file-saver";
import React from "react";
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
    component = mount(
      <Provider store={MainStore}>
        <OerebStaticExtract />
      </Provider>
    );
  });

  it('should render static extract button', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should request static extract', async () => {
    const mockSave = jest.spyOn(FileSaver, 'saveAs');
    fetch.mockResponseOnce('foo');
    await act(async () => {
      component.find('button').simulate('click');
      await sleep(500);
      component.update();
    });
    expect(fetch.mock.calls).toHaveLength(1);
    expect(mockSave).toHaveBeenCalled();
  });

});