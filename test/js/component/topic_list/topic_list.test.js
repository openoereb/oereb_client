import React from "react";
import {render} from '@testing-library/react';
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebTopicsWithRestriction from
  "../../../../oereb_client/static/src/component/topic_list/topics_with_restrictions";
import OerebTopicsWithoutRestriction from
  "../../../../oereb_client/static/src/component/topic_list/topics_without_restriction";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import {groupRestrictionsByTopic} from "../../../../oereb_client/static/src/request/extract";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

describe('topic with restriction component', () => {

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
    );
    component = render(
      <Provider store={MainStore}>
        <OerebTopicsWithRestriction
          data= {extract.GetExtractByIdResponse.extract.ConcernedTheme}
          restrictions={restrictions} />
      </Provider>
    );
  });

  it('should render topics', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

});

describe('topic without restriction component', () => {

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
        <OerebTopicsWithoutRestriction
          data= {extract.GetExtractByIdResponse.extract.NotConcernedTheme} />
      </Provider>
    );
  });

  it('should render topics', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

});