import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";

export const MESSAGE_TIMEOUT = 10000;

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: []
  },
  reducers: {
    info: (state, action) => {
      state.messages.push({
        id: uuidv4(),
        type: "info",
        text: action.payload.text,
        confirmation: action.payload.confirmation,
        timestamp: Date.now()
      });
    },
    warning: (state, action) => {
      state.messages.push({
        id: uuidv4(),
        type: "warning",
        text: action.payload.text,
        confirmation: action.payload.confirmation,
        timestamp: Date.now()
      });
    },
    error: (state, action) => {
      state.messages.push({
        id: uuidv4(),
        type: "error",
        text: action.payload.text,
        confirmation: action.payload.confirmation,
        timestamp: Date.now()
      });
    },
    close: (state, action) => {
      for (let i = 0; i < state.messages.length; i++) {
        if (state.messages[i].id === action.payload) {
          state.messages.splice(i, 1);
          break;
        }
      }
    },
    cleanMessages: (state) => {
      for (let i = state.messages.length; i > 0; i--) {
        const now = Date.now();
        if (!state.messages[i-1].confirmation && now - state.messages[i-1].timestamp >= MESSAGE_TIMEOUT) {
          state.messages.splice(i-1, 1);
        }
      }
    }
  }
});

export const {cleanMessages, info, error, warning, close} = messageSlice.actions;

export const showInfo = function(text, confirmation) {
  return function(dispatch) {
    dispatch(info({
      text: text,
      confirmation: confirmation || false
    }));
    setTimeout(() => {
      dispatch(cleanMessages());
    }, MESSAGE_TIMEOUT);
  };
}

export const showWarning = function(text, confirmation) {
  return function(dispatch) {
    dispatch(warning({
      text: text,
      confirmation: confirmation || false
    }));
    setTimeout(() => {
      dispatch(cleanMessages());
    }, MESSAGE_TIMEOUT);
  };
}

export const showError = function(text, confirmation) {
  return function(dispatch) {
    dispatch(error({
      text: text,
      confirmation: confirmation || false
    }));
    setTimeout(() => {
      dispatch(cleanMessages());
    }, MESSAGE_TIMEOUT);
  };
}

export default messageSlice.reducer;
