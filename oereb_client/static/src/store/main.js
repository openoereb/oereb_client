import { configureStore } from '@reduxjs/toolkit';
import configReducer from '../reducer/config';

const MainStore = configureStore({
    reducer: {
        config: configReducer
    }
});

export default MainStore;
