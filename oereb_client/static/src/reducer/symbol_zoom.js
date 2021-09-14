import {createSlice} from "@reduxjs/toolkit";

export const symbolZoomSlice = createSlice({
    name: 'symbolZoom',
    initialState: {
        enabled: true
    },
    reducers: {
        enableSymbolZoom: (state, action) => {
            state.enabled = action.payload;
        }
    }
});

export const {enableSymbolZoom} = symbolZoomSlice.actions;

export default symbolZoomSlice.reducer;
