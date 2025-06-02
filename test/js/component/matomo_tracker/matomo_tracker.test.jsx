import {render} from "@testing-library/react";
import React from "react";

import MatomoTracker from "../../../../oereb_client/static/src/component/matomo_tracker/matomo_tracker";

describe("permalink component", () => {

  it("should render permalink modal", async () => {
    expect(document.body.getElementsByTagName("script")).toHaveLength(0);
    render(<MatomoTracker matomoUrl="https://example.com" />);
    const scripts = document.body.getElementsByTagName("script");
    expect(scripts).toHaveLength(1);
    expect(scripts[0].src).toEqual("https://example.com/matomo.js");
  });

});