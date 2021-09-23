import {createSlice} from "@reduxjs/toolkit";

export const accordionSlice = createSlice({
  name: 'accordion',
  initialState: {
    category: null,
    topic: null,
    viewServices: []
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.category = action.payload;
    },
    setActiveTopic: (state, action) => {
      state.topic = action.payload;
    },
    setViewServices: (state, action) => {
      state.viewServices = action.payload;
    }
  }
});

export const {setActiveCategory, setActiveTopic, setViewServices} = accordionSlice.actions;

export default accordionSlice.reducer;
