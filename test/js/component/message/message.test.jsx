import {act, render} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";

import OerebMessage from "../../../../oereb_client/static/src/component/message/message";
import MainStore from "../../../../oereb_client/static/src/store/main";
import { error, info, warning } from "../../../../oereb_client/static/src/reducer/message";

describe("message component", () => {

  let component;

  beforeEach(() => {
    vi.mock('uuid', () => ({ v4: () => 'a81dad33-08cf-4b50-b0c6-d14bcc427df8' }));
    component = render(
      <Provider store={MainStore}>
        <OerebMessage />
      </Provider>
    );
  });

  it("should render message container", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should render info message", () => {
    act(() => {
      MainStore.dispatch(info({
        text: "foo",
        confirmation: false
      }));
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should render warning message", () => {
    act(() => {
      MainStore.dispatch(warning({
        text: "foo",
        confirmation: false
      }));
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should render error message", () => {
    act(() => {
      MainStore.dispatch(error({
        text: "foo",
        confirmation: false
      }));
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

});