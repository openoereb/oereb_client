import {vi} from "vitest";

import reducer, {
  cleanMessages,
  close,
  error,
  showError,
  showInfo,
  showWarning,
  warning} from "../../../oereb_client/static/src/reducer/message";
import * as messageSlice from "../../../oereb_client/static/src/reducer/message";

describe("message reducer", () => {

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      messages: []
    });
  });

  it("should add warning message", () => {
    let state = reducer(undefined, {});
    state = reducer(state, warning({
      text: "foo",
      confirmation: false
    }));
    expect(state.messages).toHaveLength(1);
    expect(state.messages[0].text).toEqual("foo");
    expect(state.messages[0].type).toEqual("warning");
    expect(typeof state.messages[0].id).toBe("string");
    expect(typeof state.messages[0].timestamp).toBe("number");
  });

  it("should add error message", () => {
    let state = reducer(undefined, {});
    state = reducer(state, error({
      text: "foo",
      confirmation: false
    }));
    expect(state.messages).toHaveLength(1);
    expect(state.messages[0].text).toEqual("foo");
    expect(state.messages[0].type).toEqual("error");
    expect(typeof state.messages[0].id).toBe("string");
    expect(typeof state.messages[0].timestamp).toBe("number");
  });

  it("should remove a specific message", () => {
    let state = reducer(undefined, {});
    state = reducer(state, error({
      text: "foo",
      confirmation: false
    }));
    state = reducer(state, error({
      text: "bar",
      confirmation: false
    }));
    expect(state.messages).toHaveLength(2);
    expect(state.messages[0].text).toEqual("foo");
    expect(state.messages[1].text).toEqual("bar");
    const messageId = state.messages[0].id;
    state = reducer(state, close(messageId));
    expect(state.messages).toHaveLength(1);
    expect(state.messages[0].text).toEqual("bar");
  });

  it("should remove timed-out messages", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 1, 1, 0, 0, 0));
    let state = reducer(undefined, {});
    state = reducer(state, warning({
      text: "foo",
      confirmation: false
    }));
    expect(state.messages).toHaveLength(1);
    vi.setSystemTime(new Date(2023, 1, 1, 0, 0, 11));
    state = reducer(state, cleanMessages());
    expect(state.messages).toHaveLength(0);
    vi.useRealTimers();
  });

  it("should show info with async removal", () => {
    const state = reducer(undefined, {});
    const infoSpy = vi.spyOn(messageSlice, "info");
    const cleanSpy = vi.spyOn(messageSlice, "cleanMessages");
    reducer(state, showInfo("foo", false));
    vi.waitFor(() => expect(infoSpy).toHaveBeenCalledWith({
      text: "foo",
      confirmation: false
    }));
    vi.waitFor(() => expect(cleanSpy).toHaveBeenCalled());
  });

  it("should show warning with async removal", () => {
    const state = reducer(undefined, {});
    const warningSpy = vi.spyOn(messageSlice, "warning");
    const cleanSpy = vi.spyOn(messageSlice, "cleanMessages");
    reducer(state, showWarning("foo", false));
    vi.waitFor(() => expect(warningSpy).toHaveBeenCalledWith({
      text: "foo",
      confirmation: false
    }));
    vi.waitFor(() => expect(cleanSpy).toHaveBeenCalled());
  });

  it("should show error with async removal", () => {
    const state = reducer(undefined, {});
    const errorSpy = vi.spyOn(messageSlice, "error");
    const cleanSpy = vi.spyOn(messageSlice, "cleanMessages");
    reducer(state, showError("foo", false));
    vi.waitFor(() => expect(errorSpy).toHaveBeenCalledWith({
      text: "foo",
      confirmation: false
    }));
    vi.waitFor(() => expect(cleanSpy).toHaveBeenCalled());
  });

});
