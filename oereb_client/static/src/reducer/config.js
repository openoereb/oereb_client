import {createSlice} from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    config: {}
  },
  reducers: {
    update: (state, action) => {
      state.config = action.payload;
    }
  }
});

export const {update} = configSlice.actions;

export default configSlice.reducer;
