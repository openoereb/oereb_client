import {createSlice} from "@reduxjs/toolkit";
import {isBoolean, isString} from "lodash";

export const symbolZoomSlice = createSlice({
  name: "symbolZoom",
  initialState: {
    key: "OerebSymbolZoom",
    enabled: true
  },
  reducers: {
    setSymbolZoomPrefix: (state, action) => {
      state.key = action.payload + "OerebSymbolZoom";
    },
    initSymbolZoom: (state) => {
      const enabled = localStorage.getItem(state.key);
      if (isBoolean(enabled)) {
        state.enabled = enabled;
      }
      else if (isString(enabled)) {
        state.enabled = JSON.parse(enabled);
      }
      else {
        state.enabled = true;
      }
    },
    enableSymbolZoom: (state, action) => {
      state.enabled = action.payload;
      localStorage.setItem(state.key, state.enabled);
    }
  }
});

export const {setSymbolZoomPrefix, initSymbolZoom, enableSymbolZoom} = symbolZoomSlice.actions;

export default symbolZoomSlice.reducer;
