import {createSlice} from "@reduxjs/toolkit";

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    current: 'de'
  },
  reducers: {
    setLanguage: (state, action) => {
      state.current = action.payload;
    }
  }
});

export const {setLanguage} = languageSlice.actions;

export default languageSlice.reducer;