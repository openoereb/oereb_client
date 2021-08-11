import { createSlice } from "@reduxjs/toolkit";

export const accordionSlice = createSlice({
    name: 'accordion',
    initialState: {
        category: null,
        topic: null
    },
    reducers: {
        setActiveCategory: (state, action) => {
            state.category = action.payload;
        },
        setActiveTopic: (state, action) => {
            state.topic = action.payload;
        }
    }
});

export const { setActiveCategory, setActiveTopic } = accordionSlice.actions;

export default accordionSlice.reducer;
