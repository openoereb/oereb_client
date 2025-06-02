import {act, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import {Provider} from "react-redux";

import OerebCategory from "../../../../oereb_client/static/src/component/category/category";
import {showExtract} from "../../../../oereb_client/static/src/reducer/extract";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

vi.mock(
  "../../../../oereb_client/static/src/component/topic_list/topics_with_restrictions",
  /* eslint-disable react/display-name */
  () => ({ default: () => <div>Mocked topics with restrictions</div> })
);
vi.mock(
  "../../../../oereb_client/static/src/component/topic_list/topics_without_restriction",
  /* eslint-disable react/display-name */
  () => ({ default: () => <div>Mocked topics without restrictions</div> })
);

describe("category component", () => {

  let component;
  let user;

  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: "de",
        available: ["de"]
      }));
    });
    act(() => {
      MainStore.dispatch(showExtract(extract));
    });
    component = render(
      <Provider store={MainStore}>
        <OerebCategory title="Test with restrictions initially shown"
          data={extract.GetExtractByIdResponse.extract.ConcernedTheme}
          restriction={true}
          initial={true} />
        <OerebCategory title="Test with restrictions"
          data={extract.GetExtractByIdResponse.extract.ConcernedTheme}
          restriction={true} />
        <OerebCategory title="Test without restrictions"
          data={extract.GetExtractByIdResponse.extract.NotConcernedTheme}
          restriction={false} />
      </Provider>
    );
    user = userEvent.setup();
  });

  it("should render category with and without restrictions", async () => {
    await new Promise((r) => setTimeout(r, 500));
    const categories = component.container.querySelectorAll(".oereb-client-category");
    expect(categories).toHaveLength(3);

    await waitFor(() => {
      expect(component.asFragment()).toMatchSnapshot();
      expect(categories[0].querySelector(".accordion-collapse")).toHaveClass("show");
      expect(categories[1].querySelector(".accordion-collapse")).not.toHaveClass("show");
      expect(categories[2].querySelector(".accordion-collapse")).not.toHaveClass("show");
    });

    await user.click(categories[1].querySelector(".accordion-button"));
    await new Promise((r) => setTimeout(r, 500));
    await waitFor(() => {
      expect(component.asFragment()).toMatchSnapshot();
      expect(categories[0].querySelector(".accordion-collapse")).not.toHaveClass("show");
      expect(categories[1].querySelector(".accordion-collapse")).toHaveClass("show");
      expect(categories[2].querySelector(".accordion-collapse")).not.toHaveClass("show");
    });

    await user.click(categories[2].querySelector(".accordion-button"));
    await new Promise((r) => setTimeout(r, 500));
    await waitFor(() => {
      expect(component.asFragment()).toMatchSnapshot();
      expect(categories[0].querySelector(".accordion-collapse")).not.toHaveClass("show");
      expect(categories[1].querySelector(".accordion-collapse")).not.toHaveClass("show");
      expect(categories[2].querySelector(".accordion-collapse")).toHaveClass("show");
    });
  });

});