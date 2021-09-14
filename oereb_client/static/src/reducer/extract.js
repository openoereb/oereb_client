import {createSlice} from "@reduxjs/toolkit";

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
                const query = new URLSearchParams(window.location.search);
                query.set('egrid', state.egrid);
                window.history.pushState(null, null, '?' + query.toString());
            }
        },
        showExtract: (state, action) => {
            state.loading = false;
            state.visible = true;
            state.error = false;
            state.data = action.payload.extract;
            console.log('Extract loaded', state.data);
        },
        showError: (state) => {
            state.loading = false;
            state.visible = false;
            state.error = true;
            state.data = {};
            const query = new URLSearchParams(window.location.search);
            query.delete('egrid');
            window.history.pushState(null, null, '?' + query.toString());
            console.log('Extract failed');
        },
        hideExtract: (state) => {
            state.loading = false;
            state.visible = false;
            state.error = false;
            state.egrid = null;
            state.data = {};
            const query = new URLSearchParams(window.location.search);
            query.delete('egrid');
            window.history.pushState(null, null, '?' + query.toString());
            console.log('Extract closed');
        }
    }
});

export const {loadExtract, showExtract, showError, hideExtract} = extractSlice.actions;

export default extractSlice.reducer;
