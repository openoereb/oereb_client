import {createSlice} from "@reduxjs/toolkit";

export const mapSlice = createSlice({
    name: 'map',
    initialState: {
        map: null,
        topicLayers: null
    },
    reducers: {
        setMap: (state, action) => {
            state.map = action.payload.map;
            state.topicLayers = action.payload.topicLayers;
        }
    }
});

export const {setMap} = mapSlice.actions;

export default mapSlice.reducer;
