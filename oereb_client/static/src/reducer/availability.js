import {createSlice} from "@reduxjs/toolkit";
import {isBoolean, isString} from "lodash";

export const availabilitySlice = createSlice({
    name: 'availability',
    initialState: {
        key: 'OerebAvailability',
        visible: true
    },
    reducers: {
        setAvailabilityPrefix: (state, action) => {
            state.key = action.payload + 'OerebAvailability';
        },
        initAvailability: (state) => {
            const availability = localStorage.getItem(state.key);
            if (isBoolean(availability)) {
                state.visible = availability;
            }
            else if (isString(availability)) {
                state.visible = JSON.parse(availability);
            }
            else {
                state.visible = true;
            }
        },
        showAvailability: (state, action) => {
            state.visible = action.payload;
            localStorage.setItem(state.key, state.visible);
        }
    }
});

export const {setAvailabilityPrefix, initAvailability, showAvailability} = availabilitySlice.actions;

export default availabilitySlice.reducer;
