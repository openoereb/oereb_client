import {configureStore} from '@reduxjs/toolkit';

import accordionReducer from '../reducer/accordion';
import availabilityReducer from '../reducer/availability';
import configReducer from '../reducer/config';
import extractReducer from '../reducer/extract';
import historyReducer from '../reducer/history';
import languageReducer from '../reducer/language';
import mapReducer from '../reducer/map';
import mapQueryReducer from '../reducer/map_query';
import symbolZoomReducer from '../reducer/symbol_zoom';

const MainStore = configureStore({
  reducer: {
    config: configReducer,
    map: mapReducer,
    mapQuery: mapQueryReducer,
    extract: extractReducer,
    accordion: accordionReducer,
    language: languageReducer,
    availability: availabilityReducer,
    symbolZoom: symbolZoomReducer,
    history: historyReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export default MainStore;
