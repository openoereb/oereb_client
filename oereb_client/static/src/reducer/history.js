import {createSlice} from "@reduxjs/toolkit";
import {isEqual} from "lodash";

export const historySlice = createSlice({
    name: 'history',
    initialState: {
        key: 'OerebHistory',
        elements: []
    },
    reducers: {
        setHistoryPrefix: (state, action) => {
            state.key = action.payload + 'OerebHistory';
        },
        initHistory: (state) => {
            const history = localStorage.getItem(state.key);
            if (history) {
                state.elements = JSON.parse(history);
            }
            else {
                state.elements = [];
            }
        },
        updateHistory: (state, action) => {
            const extract = action.payload;
            const realEstate = extract['GetExtractByIdResponse']['extract']['RealEstate'];
            const newElement = {
                EGRID: realEstate['EGRID'],
                Municipality: realEstate['Municipality'],
                Number: realEstate['Number']
            };
            for (let i = 0; i < state.elements.length; i++) {
                if (isEqual(newElement, state.elements[i])) {
                    state.elements.splice(i, 1);
                    break;
                }
            }
            if (state.elements.length > 4) {
                state.elements.splice(0, 1);
            }
            state.elements.push(newElement);
            localStorage.setItem(state.key, JSON.stringify(state.elements));
        }
    }
});

export const {setHistoryPrefix, initHistory, updateHistory} = historySlice.actions;

export default historySlice.reducer;
