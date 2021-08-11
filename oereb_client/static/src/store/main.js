import { configureStore } from '@reduxjs/toolkit';
import configReducer from '../reducer/config';
import mapQueryReducer from '../reducer/map_query';
import extractReducer from '../reducer/extract';
import accordionReducer from '../reducer/accordion';

const MainStore = configureStore({
    reducer: {
        config: configReducer,
        mapQuery: mapQueryReducer,
        extract: extractReducer,
        accordion: accordionReducer
    }
});

export default MainStore;
