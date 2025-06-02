import reducer, {initMap} from "../../../oereb_client/static/src/reducer/map";

describe("map reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      map: null,
      topicLayers: null,
      baseLayer: null
    });
  });

  it("should init map", () => {
    let state = reducer(undefined, {});
    state = reducer(state, initMap({
      map: "foo",
      topicLayers: "bar",
      baseLayer: "baz"
    }));
    expect(state).toEqual({
      map: "foo",
      topicLayers: "bar",
      baseLayer: "baz"
    });
  });

});
