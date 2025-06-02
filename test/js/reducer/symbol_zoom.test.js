import reducer, {
  enableSymbolZoom,
  initSymbolZoom,
  setSymbolZoomPrefix} from "../../../oereb_client/static/src/reducer/symbol_zoom";

beforeEach(() => {
  localStorage.clear();
});

describe("symbol zoom reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      key: "OerebSymbolZoom",
      enabled: true
    });
  });

  it("should set the prefix", () => {
    let state = reducer(undefined, {});
    state = reducer(state, setSymbolZoomPrefix("test"));
    expect(state).toEqual({
      key: "testOerebSymbolZoom",
      enabled: true
    });
  });

  it("should init symbol zoom enabled", () => {
    let state = reducer(undefined, {});
    localStorage.setItem(state.key, true);
    state = reducer(state, initSymbolZoom());
    expect(state).toEqual({
      key: "OerebSymbolZoom",
      enabled: true
    });
  });

  it("should init symbol zoom disabled", () => {
    let state = reducer(undefined, {});
    localStorage.setItem(state.key, "false");
    state = reducer(state, initSymbolZoom());
    expect(state).toEqual({
      key: "OerebSymbolZoom",
      enabled: false
    });
  });

  it("should init default symbol zoom", () => {
    let state = reducer(undefined, {});
    state = reducer(state, initSymbolZoom());
    expect(state).toEqual({
      key: "OerebSymbolZoom",
      enabled: true
    });
  });

  it("should enable/disable symbol zoom", () => {
    let state = reducer(undefined, {});
    state = reducer(state, enableSymbolZoom(false));
    expect(state).toEqual({
      key: "OerebSymbolZoom",
      enabled: false
    });
    state = reducer(state, enableSymbolZoom(true));
    expect(state).toEqual({
      key: "OerebSymbolZoom",
      enabled: true
    });
  });

});
