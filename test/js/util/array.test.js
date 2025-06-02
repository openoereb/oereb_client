import {addIfNotContains} from "../../../oereb_client/static/src/util/array";

describe("Function addIfNotContains", () => {
  it("should add a new item", () => {
    const array = [];
    const item = {
      foo: "bar"
    };
    expect(array).toHaveLength(0);
    addIfNotContains(item, array);
    expect(array).toHaveLength(1);
  });

  it("should ignore existing items", () => {
    const array = [];
    const item = {
      foo: "bar"
    };
    expect(array).toHaveLength(0);
    addIfNotContains(item, array);
    expect(array).toHaveLength(1);
    addIfNotContains(item, array);
    expect(array).toHaveLength(1);
  });
});
