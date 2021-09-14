import {configureStore} from '@reduxjs/toolkit';

import accordionReducer from '../reducer/accordion';
import availabilityReducer from '../reducer/availability';
import configReducer from '../reducer/config';
import extractReducer from '../reducer/extract';
import languageReducer from '../reducer/language';
import mapQueryReducer from '../reducer/map_query';
import symbolZoomReducer from '../reducer/symbol_zoom';

const MainStore = configureStore({
    reducer: {
        config: configReducer,
        mapQuery: mapQueryReducer,
        extract: extractReducer,
        accordion: accordionReducer,
        language: languageReducer,
        availability: availabilityReducer,
        symbolZoom: symbolZoomReducer
    }
});

export default MainStore;
