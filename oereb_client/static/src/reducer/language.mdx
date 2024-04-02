import {createSlice} from "@reduxjs/toolkit";

import i18n from "../i18n";

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    current: null,
    default: null,
    available: []
  },
  reducers: {
    initLanguages: (state, action) => {
      state.default = action.payload.default;
      state.available = action.payload.available;
      const query = new URLSearchParams(window.location.search);
      if (query.has('lang') && state.available.indexOf(query.get('lang')) > -1) {
        state.current = query.get('lang');
      }
      else {
        state.current = state.default;
      }
      i18n.changeLanguage(state.current);
      query.set('lang', state.current);
      window.history.pushState(null, null, '?' + query.toString());
    },
    setLanguage: (state, action) => {
      if (state.available.indexOf(action.payload) > -1) {
        state.current = action.payload;
        i18n.changeLanguage(state.current);
        const query = new URLSearchParams(window.location.search);
        query.set('lang', state.current);
        window.history.pushState(null, null, '?' + query.toString());
      }
    }
  }
});

export const {initLanguages, setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
