import {act, render} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";

import OerebResponsibleOffice from
  "../../../../oereb_client/static/src/component/responsible_office/responsible_office";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import {groupRestrictionsByTopic} from "../../../../oereb_client/static/src/request/extract";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

describe("responsible office component", () => {

  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: "de",
        available: ["de"]
      }));
    });
  });

  it("should render responsible office", () => {
    const restrictions = groupRestrictionsByTopic(
      extract.GetExtractByIdResponse.extract.RealEstate.RestrictionOnLandownership,
      extract.GetExtractByIdResponse.extract.ConcernedTheme
    )["chStatischeWaldgrenzen"]["inForce"];
    const component = render(
      <Provider store={MainStore}>
        <OerebResponsibleOffice restrictions={restrictions} />
      </Provider>
    );
    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should render responsible office without url", () => {
    const restrictions = groupRestrictionsByTopic(
      extract.GetExtractByIdResponse.extract.RealEstate.RestrictionOnLandownership,
      extract.GetExtractByIdResponse.extract.ConcernedTheme
    )["chStatischeWaldgrenzen"]["inForce"];
    restrictions.forEach((restriction) => {
      restriction["ResponsibleOffice"]["OfficeAtWeb"] = null;
    });
    const component = render(
      <Provider store={MainStore}>
        <OerebResponsibleOffice restrictions={restrictions} />
      </Provider>
    );
    expect(component.asFragment()).toMatchSnapshot();
  });

});