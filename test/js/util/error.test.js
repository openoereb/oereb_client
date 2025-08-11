import {expect} from "vitest";

import {NoDataError, TooManyRequestsError} from "../../../oereb_client/static/src/util/error";

describe("NoDataError", () => {
  it("should have correct name", () => {
    const error = new NoDataError();
    expect(error.name).toEqual("NoDataError");
  });
});

describe("TooManyRequestsError", () => {
  it("should have correct name", () => {
    const error = new TooManyRequestsError();
    expect(error.name).toEqual("TooManyRequestsError");
  });
});
