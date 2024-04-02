import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";

export const MESSAGE_TIMEOUT = 10000;

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: []
  },
  reducers: {
    warning: (state, action) => {
      state.messages.push({
        id: uuidv4(),
        type: 'warning',
        text: action.payload,
        timestamp: Date.now()
      });
    },
    error: (state, action) => {
      state.messages.push({
        id: uuidv4(),
        type: 'error',
        text: action.payload,
        timestamp: Date.now()
      });
    },
    cleanMessages: (state) => {
      for (let i = state.messages.length; i > 0; i--) {
        const now = Date.now();
        if (now - state.messages[i - 1].timestamp >= MESSAGE_TIMEOUT) {
          state.messages.splice(i - 1, 1);
        }
      }
    }
  }
});

export const {cleanMessages, error, warning} = messageSlice.actions;

export const showWarning = function(text) {
  return function(dispatch) {
    dispatch(warning(text));
    setTimeout(() => {
      dispatch(cleanMessages());
    }, MESSAGE_TIMEOUT);
  }
}

export const showError = function(text) {
  return function(dispatch) {
    dispatch(error(text));
    setTimeout(() => {
      dispatch(cleanMessages());
    }, MESSAGE_TIMEOUT);
  }
}

export default messageSlice.reducer;
