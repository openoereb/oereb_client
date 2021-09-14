import {createSlice} from "@reduxjs/toolkit";

export const availabilitySlice = createSlice({
    name: 'availability',
    initialState: {
        visible: true
    },
    reducers: {
        showAvailability: (state, action) => {
            state.visible = action.payload;
        }
    }
});

export const {showAvailability} = availabilitySlice.actions;

export default availabilitySlice.reducer;
