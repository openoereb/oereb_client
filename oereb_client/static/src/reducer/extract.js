import {createSlice} from "@reduxjs/toolkit";

export const extractSlice = createSlice({
    name: 'extract',
    initialState: {
        loading: false,
        zoom: false,
        visible: false,
        error: false,
        egrid: null,
        information: false,
        tab: 0,
        data: {}
    },
    reducers: {
        loadExtract: (state, action) => {
            console.log('Extract loading');
            if (!state.loading) {
                state.loading = true;
                state.visible = false;
                state.error = false;
                state.information = false;
                state.tab = 0;
                state.egrid = action.payload.egrid;
                state.zoom = action.payload.zoom;
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
            state.information = false;
            state.tab = 0;
            state.data = action.payload;
            console.log('Extract loaded', state.data);
        },
        showError: (state) => {
            state.loading = false;
            state.zoom = false;
            state.visible = false;
            state.error = true;
            state.information = false;
            state.tab = 0;
            state.data = {};
            const query = new URLSearchParams(window.location.search);
            query.delete('egrid');
            window.history.pushState(null, null, '?' + query.toString());
            console.log('Extract failed');
        },
        hideExtract: (state) => {
            state.loading = false;
            state.zoom = false;
            state.visible = false;
            state.error = false;
            state.egrid = null;
            state.information = false;
            state.tab = 0;
            state.data = {};
            const query = new URLSearchParams(window.location.search);
            query.delete('egrid');
            window.history.pushState(null, null, '?' + query.toString());
            console.log('Extract closed');
        },
        toggleInformationPanel: (state) => {
            state.information = !state.information;
            if (state.information) {
                state.tab = 0;
            }
        },
        setInformationPanelTab: (state, action) => {
            state.tab = action.payload;
        }
    }
});

export const {
    loadExtract,
    showExtract,
    showError,
    hideExtract,
    toggleInformationPanel,
    setInformationPanelTab
} = extractSlice.actions;

export default extractSlice.reducer;
