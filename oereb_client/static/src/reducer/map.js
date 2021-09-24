import {createSlice} from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    map: null,
    topicLayers: null
  },
  reducers: {
    initMap: (state, action) => {
      state.map = action.payload.map;
      state.topicLayers = action.payload.topicLayers;
    }
  }
});

export const {initMap} = mapSlice.actions;

export default mapSlice.reducer;
