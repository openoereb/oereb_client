import {expect} from "vitest";

import {NoDataError} from "../../../oereb_client/static/src/util/error";

describe("NoDataError", () => {
  it("should have correct name", () => {
    const error = new NoDataError();
    expect(error.name).toEqual("NoDataError");
  });
});
