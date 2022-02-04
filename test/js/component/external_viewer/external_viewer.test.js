import {mount} from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import {Provider} from "react-redux";

import OerebExternalViewer
  from "../../../../oereb_client/static/src/component/external_viewer/external_viewer";
import {update} from "../../../../oereb_client/static/src/reducer/config";
import {hideExtract, showExtract} from "../../../../oereb_client/static/src/reducer/extract";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

describe('external viewer component', () => {

  let component;

  beforeEach(() => {
    MainStore.dispatch(initLanguages({
      default: 'de',
      available: ['de']
    }));
    MainStore.dispatch(showExtract(extract));
    MainStore.dispatch(update({
      external_viewer: {
        url: 'http://example.com',
        tooltip: [
          {
            Language: 'de',
            Text: 'WebGIS'
          }
        ],
        params: [
          'egrid={egrid}'
        ]
      }
    }));
    component = mount(
      <Provider store={MainStore}>
        <OerebExternalViewer />
      </Provider>
    );
  });

  it('should render button', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should not render button', () => {
    MainStore.dispatch(update({}));
    const wrapper = mount(
      <Provider store={MainStore}>
        <OerebExternalViewer />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call window.open', () => {
    const mockOpen = jest.spyOn(window, 'open');
    component.find('button').simulate('click');
    expect(mockOpen.mock.calls).toHaveLength(1);
    expect(mockOpen.mock.calls[0][0]).toEqual('http://example.com?egrid=CH1234');
    expect(mockOpen.mock.calls[0][1]).toEqual('_blank');
    mockOpen.mockReset();
  });

  it('should not call window.open', () => {
    MainStore.dispatch(hideExtract());
    const mockOpen = jest.spyOn(window, 'open');
    component.find('button').simulate('click');
    expect(mockOpen.mock.calls).toHaveLength(0);
    mockOpen.mockReset();
  });

});