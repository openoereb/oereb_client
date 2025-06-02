import {act, render} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";

import OerebLegend from "../../../../oereb_client/static/src/component/legend/legend";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import {groupRestrictionsByTopic} from "../../../../oereb_client/static/src/request/extract";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

describe("legend component", () => {

  let component;

  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: "de",
        available: ["de"]
      }));
    });
    const restrictions = groupRestrictionsByTopic(
      extract.GetExtractByIdResponse.extract.RealEstate.RestrictionOnLandownership,
      extract.GetExtractByIdResponse.extract.ConcernedTheme
    )["chStatischeWaldgrenzen"]["inForce"];
    component = render(
      <Provider store={MainStore}>
        <OerebLegend restrictions={restrictions} />
      </Provider>
    );
  });

  it("should render legend", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

});