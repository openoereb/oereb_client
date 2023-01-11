import {render} from '@testing-library/react';
import {Map} from "ol";
import React from "react";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebMapQuery from "../../../../oereb_client/static/src/component/map_query/map_query";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import {loadAt, show} from "../../../../oereb_client/static/src/reducer/map_query";
import MainStore from "../../../../oereb_client/static/src/store/main";

describe('map query component', () => {

  const map = new Map();

  let component;

  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: 'de',
        available: ['de']
      }));
    });
    component = render(
      <Provider store={MainStore}>
        <OerebMapQuery map={map} />
      </Provider>
    );
  });

  it('should render map query', () => {
    expect(component.asFragment()).toMatchSnapshot();
    act(() => {
      MainStore.dispatch(loadAt({
        posX: 0.0,
        posY: 0.0
      }));
    });
    expect(component.asFragment()).toMatchSnapshot();
    act(() => {
      MainStore.dispatch(show({
        results: [
          {
            egrid: 'CH0815',
            number: '0815',
            identDN: 'SAMPLE1',
            type: {
              Code: 'Distinct_and_permanent_rights.BuildingRight',
              Text: [
                {
                  Language: 'de',
                  Text: 'Baurecht'
                },
                {
                  Language: 'fr',
                  Text: 'Droit de superficie'
                },
                {
                  Language: 'it',
                  Text: 'Diritto di superficie'
                },
                {
                  Language: 'rm',
                  Text: 'Dretg da construcziun'
                },
                {
                  Language: 'en',
                  Text: 'Building right'
                }
              ]
            }
          },
          {
            egrid: 'CH1234',
            number: '1234',
            identDN: 'SAMPLE2',
            type: {
              Code: 'RealEstate',
              Text: [
                {
                  Language: 'de',
                  Text: 'Liegenschaft'
                },
                {
                  Language: 'fr',
                  Text: 'Bien-fonds'
                },
                {
                  Language: 'it',
                  Text: 'Bene immobile'
                },
                {
                  Language: 'rm',
                  Text: 'Bain immobigliar'
                },
                {
                  Language: 'en',
                  Text: 'Property'
                }
              ]
            }
          }
        ]
      }));
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

});