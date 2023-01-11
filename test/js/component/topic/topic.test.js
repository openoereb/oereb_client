import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  let user;

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
        <OerebTopic restrictions={restrictions} />
      </Provider>
    );
    user = userEvent.setup();
  });

  it('should render topic', async () => {
    expect(component.asFragment()).toMatchSnapshot();
    await user.click(component.container.querySelector('button'));
    expect(component.asFragment()).toMatchSnapshot();
  });

});