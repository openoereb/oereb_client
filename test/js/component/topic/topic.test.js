import {mount} from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebTopic from "../../../../oereb_client/static/src/component/topic/topic";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import {groupRestrictionsByTopic} from "../../../../oereb_client/static/src/request/extract";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

describe('topic component', () => {

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
    component = mount(
      <Provider store={MainStore}>
        <OerebTopic restrictions={restrictions} />
      </Provider>
    );
  });

  it('should render topic', () => {
    expect(toJson(component)).toMatchSnapshot();
    component.find('button').simulate('click');
    expect(toJson(component)).toMatchSnapshot();
  });

});