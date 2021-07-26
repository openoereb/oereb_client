import { configureStore } from '@reduxjs/toolkit';
import configReducer from '../reducer/config';
import mapQueryReducer from '../reducer/map_query';

const MainStore = configureStore({
    reducer: {
        config: configReducer,
        mapQuery: mapQueryReducer
    }
});

export default MainStore;
