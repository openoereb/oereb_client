import reducer, {
  initHistory,
  setHistoryPrefix,
  updateHistory
} from "../../../oereb_client/static/src/reducer/history";

beforeEach(() => {
  localStorage.clear();
});

describe("history reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      key: "OerebHistory",
      elements: []
    });
  });

  it("should set history prefix", () => {
    let state = reducer(undefined, {});
    state = reducer(state, setHistoryPrefix("test"));
    expect(state).toEqual({
      key: "testOerebHistory",
      elements: []
    });
  });

  it("should init default history", () => {
    let state = reducer(undefined, {});
    state = reducer(state, initHistory());
    expect(state).toEqual({
      key: "OerebHistory",
      elements: []
    });
  });

  it("should init existing history", () => {
    const element = {
      EGRID: "CH123456789",
      Municipality: "Testwil",
      Number: "1"
    };
    let state = reducer(undefined, {});
    localStorage.setItem(state.key, JSON.stringify([element]));
    state = reducer(state, initHistory());
    expect(state).toEqual({
      key: "OerebHistory",
      elements: [element]
    });
  });

  it("should update history", () => {
    let state = reducer(undefined, {});
    state = reducer(state, initHistory());
    expect(state.elements).toHaveLength(0);
    state = reducer(state, updateHistory({
      GetExtractByIdResponse: {
        extract: {
          RealEstate: {
            EGRID: "CH1234",
            MunicipalityName: "Testwil",
            Number: "1"
          }
        }
      }
    }));
    expect(state.elements).toHaveLength(1);
    state = reducer(state, updateHistory({
      GetExtractByIdResponse: {
        extract: {
          RealEstate: {
            EGRID: "CH1234",
            MunicipalityName: "Testwil",
            Number: "1"
          }
        }
      }
    }));
    expect(state.elements).toHaveLength(1);
    state = reducer(state, updateHistory({
      GetExtractByIdResponse: {
        extract: {
          RealEstate: {
            EGRID: "CH2345",
            MunicipalityName: "Testwil",
            Number: "2"
          }
        }
      }
    }));
    expect(state.elements).toHaveLength(2);
    state = reducer(state, updateHistory({
      GetExtractByIdResponse: {
        extract: {
          RealEstate: {
            EGRID: "CH3456",
            MunicipalityName: "Testwil",
            Number: "3"
          }
        }
      }
    }));
    expect(state.elements).toHaveLength(3);
    state = reducer(state, updateHistory({
      GetExtractByIdResponse: {
        extract: {
          RealEstate: {
            EGRID: "CH4567",
            MunicipalityName: "Testwil",
            Number: "4"
          }
        }
      }
    }));
    expect(state.elements).toHaveLength(4);
    state = reducer(state, updateHistory({
      GetExtractByIdResponse: {
        extract: {
          RealEstate: {
            EGRID: "CH5678",
            MunicipalityName: "Testwil",
            Number: "5"
          }
        }
      }
    }));
    expect(state.elements).toHaveLength(5);
    state = reducer(state, updateHistory({
      GetExtractByIdResponse: {
        extract: {
          RealEstate: {
            EGRID: "CH6789",
            MunicipalityName: "Testwil",
            Number: "6"
          }
        }
      }
    }));
    expect(state.elements).toHaveLength(5);
  });

});
