import {createSlice} from "@reduxjs/toolkit";

export const mapQuerySlice = createSlice({
    name: 'mapQuery',
    initialState: {
        loading: false,
        visible: false,
        posX: 0.0,
        posY: 0.0,
        results: []
    },
    reducers: {
        loadAt: (state, action) => {
            if (!state.loading) {
                state.loading = true;
                state.visible = false;
                state.posX = action.payload.posX;
                state.posY = action.payload.posY;
                state.results = [];
            }
        },
        show: (state, action) => {
            state.loading = false;
            state.visible = true;
            state.results = action.payload.results;
        },
        hide: (state) => {
            state.loading = false;
            state.visible = false;
        }
    }
});

export const {loadAt, show, hide} = mapQuerySlice.actions;

export default mapQuerySlice.reducer;
