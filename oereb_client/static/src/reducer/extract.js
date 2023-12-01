import {createSlice} from "@reduxjs/toolkit";

export const extractSlice = createSlice({
  name: 'extract',
  initialState: {
    loading: false,
    zoom: false,
    visible: false,
    collapsed: false,
    error: false,
    egrid: null,
    identdn: null,
    number: null,
    information: false,
    tab: 0,
    data: {},
    highlight: true,
    background: true
  },
  reducers: {
    loadExtract: (state, action) => {
      if (!state.loading) {
        state.loading = true;
        state.visible = false;
        state.collapsed = false;
        state.error = false;
        state.information = false;
        state.tab = 0;
        state.egrid = action.payload.egrid;
        state.identdn = action.payload.identdn;
        state.number = action.payload.number;
        state.zoom = action.payload.zoom;
        state.data = {};
        const query = new URLSearchParams(window.location.search);
        if (state.egrid !== null) {
          query.set('egrid', state.egrid);
        }
        else if (state.identdn !== null && state.number !== null) {
          query.set('identdn', state.identdn);
          query.set('number', state.number);
        }
        window.history.pushState(null, null, '?' + query.toString());
      }
    },
    showExtract: (state, action) => {
      state.loading = false;
      state.visible = true;
      state.collapsed = false;
      state.error = false;
      state.information = false;
      state.highlight = true;
      state.background = true;
      state.tab = 0;
      state.data = action.payload;
    },
    showError: (state) => {
      state.loading = false;
      state.zoom = false;
      state.visible = false;
      state.collapsed = false;
      state.error = true;
      state.information = false;
      state.tab = 0;
      state.data = {};
      const query = new URLSearchParams(window.location.search);
      query.delete('egrid');
      query.delete('identdn');
      query.delete('number');
      window.history.pushState(null, null, '?' + query.toString());
    },
    hideExtract: (state) => {
      state.loading = false;
      state.zoom = false;
      state.visible = false;
      state.collapsed = false;
      state.error = false;
      state.egrid = null;
      state.identdn = null;
      state.number = null;
      state.information = false;
      state.tab = 0;
      state.data = {};
      const query = new URLSearchParams(window.location.search);
      query.delete('egrid');
      query.delete('identdn');
      query.delete('number');
      window.history.pushState(null, null, '?' + query.toString());
    },
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    toggleHighlight: (state) => {
      state.highlight = !state.highlight;
    },
    toggleBackground: (state) => {
      state.background = !state.background;
    },
    toggleInformationPanel: (state) => {
      state.information = !state.information;
      if (state.information) {
        state.tab = 0;
      }
    },
    setInformationPanelTab: (state, action) => {
      state.tab = action.payload;
    }
  }
});

export const {
  loadExtract,
  showExtract,
  showError,
  hideExtract,
  toggleCollapsed,
  toggleHighlight,
  toggleBackground,
  toggleInformationPanel,
  setInformationPanelTab
} = extractSlice.actions;

export default extractSlice.reducer;
