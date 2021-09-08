import {configureStore} from '@reduxjs/toolkit';

import accordionReducer from '../reducer/accordion';
import configReducer from '../reducer/config';
import extractReducer from '../reducer/extract';
import languageReducer from '../reducer/language';
import mapQueryReducer from '../reducer/map_query';

const MainStore = configureStore({
    reducer: {
        config: configReducer,
        mapQuery: mapQueryReducer,
        extract: extractReducer,
        accordion: accordionReducer,
        language: languageReducer
    }
});

export default MainStore;
