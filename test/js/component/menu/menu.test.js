import React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebMenu from "../../../../oereb_client/static/src/component/menu/menu";
import {update} from "../../../../oereb_client/static/src/reducer/config";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";

const sleep = function(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const config = {
  application: {
    title: [
      {
        Language: 'en',
        Text: 'PLR Cadastre, Canton of Basel-Landschaft'
      },
      {
        Language: 'de',
        Text: 'ÖREB-Kataster, Kanton Basel-Landschaft'
      },
      {
        Language: 'fr',
        Text: 'Cadastre RDPPF, Canton de Bâle-Campagne'
      }
    ],
    logo_oereb: [
      {
        Language: 'en',
        URL: 'http://localhost:8080/samples/static/logo_oereb_en.png'
      },
      {
        Language: 'de',
        URL: 'http://localhost:8080/samples/static/logo_oereb_de.png'
      },
      {
        Language: 'fr',
        URL: 'http://localhost:8080/samples/static/logo_oereb_fr.png'
      }
    ],
    logo_canton: [
      {
        Language: 'en',
        URL: 'http://localhost:8080/samples/static/logo_bl.png'
      },
      {
        Language: 'de',
        URL: 'http://localhost:8080/samples/static/logo_bl.png'
      },
      {
        Language: 'fr',
        URL: 'http://localhost:8080/samples/static/logo_bl.png'
      }
    ],
    local_storage_prefix: 'bl',
    languages: ['en', 'de', 'fr'],
    default_language: 'en'
  },
  search_url: 'http://example.com/search'
};

describe('menu component', () => {

  let component;

  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: 'de',
        available: ['de']
      }));
    });
    act(() => {
      MainStore.dispatch(update(config));
    });
    component = render(
      <Provider store={MainStore}>
        <OerebMenu />
      </Provider>
    );
  });

  it('should render menu', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

});

describe('search', () => {

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
      MainStore.dispatch(update(config));
    });
    component = render(
      <Provider store={MainStore}>
        <OerebMenu />
      </Provider>
    );
  });

  it('should show LV95 coordinates', async () => {
    fetch.mockResponseOnce('[]');
    fireEvent.change(component.container.querySelector('input'), {
      target: {
        value: '2600000 1200000'
      }
    });
    await sleep(500);
    await waitFor(() => {
      expect(component.asFragment()).toMatchSnapshot();
      expect(fetch.mock.calls).toHaveLength(1);
    });
  });

  it('should show GNSS coordinates', async () => {
    fetch.mockResponseOnce('[]');
    fireEvent.change(component.container.querySelector('input'), {
      target: {
        value: '7.72867 47.48910'
      }
    });
    await sleep(500);
    await waitFor(() => {
      expect(component.asFragment()).toMatchSnapshot();
      expect(fetch.mock.calls).toHaveLength(1);
    });
  });

  it('should show results', async () => {
    fetch.mockResponseOnce(JSON.stringify([
      {
        title: 'Set 1',
        results: [
          {
            label: 'Result 1',
            coordinates: [0.0, 0.0]
          },
          {
            label: 'Result 2',
            coordinates: [1.0, 1.0]
          }
        ]
      },
      {
        title: 'Set 2',
        results: [
          {
            label: 'Result 3',
            egrid: 'CH1234'
          },
          {
            label: 'Result 4',
            egrid: 'CH5678'
          }
        ]
      }
    ]));
    fireEvent.change(component.container.querySelector('input'), {
      target: {
        value: 'abc'
      }
    });
    await sleep(500);
    await waitFor(() => {
      expect(component.asFragment()).toMatchSnapshot();
      expect(fetch.mock.calls).toHaveLength(1);
    });
  });

});