import {act, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import {Provider} from "react-redux";

import OerebPermalink from "../../../../oereb_client/static/src/component/permalink/permalink";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";

describe("permalink component", () => {

  let component;
  let user;

  const modal =
    <div className="modal fade" id="permalinkModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Permalink</h5>
            <button type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close">
            </button>
          </div>
          <div className="modal-body">
            <input className="form-control" />
          </div>
        </div>
      </div>
    </div>;
  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: "de",
        available: ["de"]
      }));
    });
    const el = document.createElement("div");
    document.body.append(el);
    render(modal, el);
    component = render(
      <Provider store={MainStore}>
        <OerebPermalink />
      </Provider>
    );
    user = userEvent.setup();
  });

  it("should render permalink modal", async () => {
    expect(component.asFragment()).toMatchSnapshot();
    await user.click(component.container.querySelector("button"));
    expect(component.asFragment()).toMatchSnapshot();
  });

});