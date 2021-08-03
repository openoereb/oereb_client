import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: null
    },
    reducers: {
        setActiveCategory: (state, action) => {
            state.category = action.payload;
        }
    }
});

export const { setActiveCategory } = categorySlice.actions;

export default categorySlice.reducer;
