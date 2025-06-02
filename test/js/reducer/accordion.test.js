import reducer, {
  setActiveCategory,
  setActiveTopic,
  setViewServices
} from "../../../oereb_client/static/src/reducer/accordion";

describe("accordion reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      category: null,
      topic: null,
      viewServices: [],
      callback: null
    });
  });

  it("should set the active category", () => {
    let state = reducer(undefined, {});
    state = reducer(state, setActiveCategory("test"));
    expect(state).toEqual({
      category: "test",
      topic: null,
      viewServices: [],
      callback: null
    });
  });

  it("should set the active topic", () => {
    let state = reducer(undefined, {});
    state = reducer(state, setActiveTopic("test"));
    expect(state).toEqual({
      category: null,
      topic: "test",
      viewServices: [],
      callback: null
    });
  });

  it("should update the view services", () => {
    let state = reducer(undefined, {});
    state = reducer(state, setViewServices({
      viewServices: [1, 2, 3],
      callback: "foo"
    }));
    expect(state).toEqual({
      category: null,
      topic: null,
      viewServices: [1, 2, 3],
      callback: "foo"
    });
  });

});
