import {format} from "../../../oereb_client/static/src/util/string";

describe("format", () => {
  it("should return input unmodified", () => {
    expect(format(100)).toBe(100);
  });

  it("should return formatted string", () => {
    expect(format("{val1} {val2}", {
      val1: "foo",
      val2: "bar"
    })).toEqual("foo bar");
  });
});