import {createSlice} from "@reduxjs/toolkit";
import {isBoolean, isString} from "lodash";

export const maskSurroundingSlice = createSlice({
  name: 'maskSurrounding',
  initialState: {
    key: 'OerebMaskSurrounding',
    visible: true
  },
  reducers: {
    setMaskSurroundingPrefix: (state, action) => {
      state.key = action.payload + 'OerebMaskSurrounding';
    },
    initMaskSurrounding: (state) => {
      const maskSurrounding = localStorage.getItem(state.key);
      if (isBoolean(maskSurrounding)) {
        state.visible = maskSurrounding;
      }
      else if (isString(maskSurrounding)) {
        state.visible = JSON.parse(maskSurrounding);
      }
      else {
        state.visible = true;
      }
    },
    showMaskSurrounding: (state, action) => {
      state.visible = action.payload;
      localStorage.setItem(state.key, state.visible);
    }
  }
});

export const {setMaskSurroundingPrefix, initMaskSurrounding, showMaskSurrounding} = maskSurroundingSlice.actions;

export default maskSurroundingSlice.reducer;
