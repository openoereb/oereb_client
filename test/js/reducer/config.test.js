import reducer, {update} from "../../../oereb_client/static/src/reducer/config";

describe("config reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      config: {}
    });
  });

  it("should update config", () => {
    let state = reducer(undefined, {});
    state = reducer(state, update({
      foo: "bar"
    }));
    expect(state).toEqual({
      config: {
        foo: "bar"
      }
    });
  });

});
