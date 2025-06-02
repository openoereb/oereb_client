import reducer, {
  initAvailability,
  setAvailabilityPrefix,
  showAvailability
} from "../../../oereb_client/static/src/reducer/availability";

beforeEach(() => {
  localStorage.clear();
});

describe("availability reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      key: "OerebAvailability",
      visible: true
    });
  });

  it("should set the prefix", () => {
    let state = reducer(undefined, {});
    state = reducer(state, setAvailabilityPrefix("test"));
    expect(state).toEqual({
      key: "testOerebAvailability",
      visible: true
    });
  });

  it("should init availability visible", () => {
    let state = reducer(undefined, {});
    localStorage.setItem(state.key, true);
    state = reducer(state, initAvailability());
    expect(state).toEqual({
      key: "OerebAvailability",
      visible: true
    });
  });

  it("should init availability hidden", () => {
    let state = reducer(undefined, {});
    localStorage.setItem(state.key, "false");
    state = reducer(state, initAvailability());
    expect(state).toEqual({
      key: "OerebAvailability",
      visible: false
    });
  });

  it("should init default availability", () => {
    let state = reducer(undefined, {});
    state = reducer(state, initAvailability());
    expect(state).toEqual({
      key: "OerebAvailability",
      visible: true
    });
  });

  it("should set the visibility", () => {
    let state = reducer(undefined, {});
    state = reducer(state, showAvailability(false));
    expect(state).toEqual({
      key: "OerebAvailability",
      visible: false
    });
    state = reducer(state, showAvailability(true));
    expect(state).toEqual({
      key: "OerebAvailability",
      visible: true
    });
  });

});
