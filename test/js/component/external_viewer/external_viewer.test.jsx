import {act, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import {Provider} from "react-redux";

import OerebExternalViewer
  from "../../../../oereb_client/static/src/component/external_viewer/external_viewer";
import {update} from "../../../../oereb_client/static/src/reducer/config";
import {hideExtract, showExtract} from "../../../../oereb_client/static/src/reducer/extract";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

describe("external viewer component", () => {

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
    act(() => {
      MainStore.dispatch(update({
        external_viewer: {
          url: "http://example.com",
          tooltip: [
            {
              Language: "de",
              Text: "WebGIS"
            }
          ],
          params: [
            "egrid={egrid}"
          ]
        }
      }));
    });
    component = render(
      <Provider store={MainStore}>
        <OerebExternalViewer />
      </Provider>
    );
    user = userEvent.setup();
    window.open = vi.fn();
  });

  afterEach(() => {
    window.open.mockClear();
  });

  it("should render button", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should not render button", () => {
    act(() => {
      MainStore.dispatch(update({}));
    });
    const wrapper = render(
      <Provider store={MainStore}>
        <OerebExternalViewer />
      </Provider>
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it("should call window.open", async () => {
    await user.click(component.container.querySelector("button"));
    expect(window.open.mock.calls).toHaveLength(1);
    expect(window.open.mock.calls[0][0]).toEqual("http://example.com?egrid=CH1234");
    expect(window.open.mock.calls[0][1]).toEqual("_blank");
    window.open.mockReset();
  });

  it("should not call window.open", async () => {
    act(() => {
      MainStore.dispatch(hideExtract());
    });
    await user.click(component.container.querySelector("button"));
    expect(window.open.mock.calls).toHaveLength(0);
    window.open.mockReset();
  });

});