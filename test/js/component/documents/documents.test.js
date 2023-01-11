import {render} from '@testing-library/react';
import React from "react";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebDocuments from "../../../../oereb_client/static/src/component/documents/documents";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import {groupRestrictionsByTopic} from "../../../../oereb_client/static/src/request/extract";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

describe('documents component', () => {

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
        <OerebDocuments restrictions={restrictions} />
      </Provider>
    );
  });

  it('should render documents', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

});