import {mount} from "enzyme";
import React from "react";
import {Provider} from "react-redux";

import OerebDocuments from "../../../../oereb_client/static/src/component/documents/documents";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import {groupRestrictionsByTopic} from "../../../../oereb_client/static/src/request/extract";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

describe('documents component', () => {

  let component;

  beforeEach(() => {
    MainStore.dispatch(initLanguages({
      default: 'de',
      available: ['de']
    }));
    const restrictions = groupRestrictionsByTopic(
      extract.GetExtractByIdResponse.extract.RealEstate.RestrictionOnLandownership
    )['chStatischeWaldgrenzen']['inForce'];
    component = mount(
      <Provider store={MainStore}>
        <OerebDocuments restrictions={restrictions} />
      </Provider>
    );
  });

  it('should render documents', () => {
    expect(component).toMatchSnapshot();
  });

});