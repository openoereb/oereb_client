import { configureStore } from '@reduxjs/toolkit';
import configReducer from '../reducer/config';
import mapQueryReducer from '../reducer/map_query';
import extractReducer from '../reducer/extract';
import categoryReducer from '../reducer/category';

const MainStore = configureStore({
    reducer: {
        config: configReducer,
        mapQuery: mapQueryReducer,
        extract: extractReducer,
        category: categoryReducer
    }
});

export default MainStore;
