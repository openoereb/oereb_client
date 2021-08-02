import { createSlice } from "@reduxjs/toolkit";

export const extractSlice = createSlice({
    name: 'extract',
    initialState: {
        loading: false,
        visible: false,
        error: false,
        egrid: null,
        data: {}
    },
    reducers: {
        loadExtract: (state, action) => {
            console.log('Extract loading');
            if (!state.loading) {
                state.loading = true;
                state.visible = false;
                state.error = false;
                state.egrid = action.payload.egrid;
                state.data = {};
            }
        },
        showExtract: (state, action) => {
            state.loading = false;
            state.visible = true;
            state.error = false;
            state.data = action.payload.extract;
            console.log('Extract loaded', state.data);
        },
        showError: (state, action) => {
            state.loading = false;
            state.visible = false;
            state.error = true;
            state.data = {};
            console.log('Extract failed');
        },
        hideExtract: (state, action) => {
            state.loading = false;
            state.visible = false;
            state.error = false;
            state.egrid = null;
            state.data = {};
            console.log('Extract closed');
        }
    }
});

export const { loadExtract, showExtract, showError, hideExtract } = extractSlice.actions;

export default extractSlice.reducer;
