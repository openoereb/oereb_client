import React from "react";
import {render} from '@testing-library/react';
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebResponsibleOffice from
  "../../../../oereb_client/static/src/component/responsible_office/responsible_office";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import {groupRestrictionsByTopic} from "../../../../oereb_client/static/src/request/extract";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

describe('responsible office component', () => {

  let component;

  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: 'de',
        available: ['de']
      }));
    });
    const restrictions = groupRestrictionsByTopic(
      extract.GetExtractByIdResponse.extract.RealEstate.RestrictionOnLandownership,
      extract.GetExtractByIdResponse.extract.ConcernedTheme
    )['chStatischeWaldgrenzen']['inForce'];
    component = render(
      <Provider store={MainStore}>
        <OerebResponsibleOffice restrictions={restrictions} />
      </Provider>
    );
  });

  it('should render responsible office', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

});