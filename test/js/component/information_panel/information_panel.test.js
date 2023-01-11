import {act, fireEvent, render, waitFor} from '@testing-library/react';
import React from "react";
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

let mockDate;

beforeAll(() => {
  mockDate = jest.spyOn(Date.prototype, 'toLocaleDateString').mockReturnValue('01.01.2022');
});

afterAll(() => {
  mockDate.mockRestore();
});

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
    component = render(
      <Provider store={MainStore}>
        <OerebInformationPanel />
      </Provider>
    );
  });

  it('should render general information', () => {
    act(() => {
      MainStore.dispatch(setInformationPanelTab(0));
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should render disclaimer', () => {
    act(() => {
      MainStore.dispatch(setInformationPanelTab(1));
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should render glossary', () => {
    act(() => {
      MainStore.dispatch(setInformationPanelTab(2));
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should filter glossary results', async () => {
    act(() => {
      MainStore.dispatch(setInformationPanelTab(2));
    });
    fireEvent.change(component.container.querySelector('input'), {target: {value: 'kbs'}});
    await waitFor(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });

});