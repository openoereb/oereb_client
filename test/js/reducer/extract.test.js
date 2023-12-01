import reducer, {
  hideExtract,
  loadExtract,
  setInformationPanelTab,
  showError,
  showExtract,
  toggleBackground,
  toggleCollapsed,
  toggleHighlight,
  toggleInformationPanel} from '../../../oereb_client/static/src/reducer/extract';

describe('extract reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
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
    });
  });

  it('should set loading true', () => {
    window.history.pushState = vi.fn();
    let state = reducer(undefined, {});
    state = reducer(state, loadExtract({
      egrid: 'CH123456789',
      identdn: 'foo',
      number: '1234',
      zoom: true
    }));
    expect(state).toEqual({
      loading: true,
      zoom: true,
      visible: false,
      collapsed: false,
      error: false,
      egrid: 'CH123456789',
      identdn: 'foo',
      number: '1234',
      information: false,
      tab: 0,
      data: {},
      highlight: true,
      background: true
    });
    expect(window.history.pushState).toHaveBeenCalled();
  });

  it('should show extract', () => {
    let state = reducer(undefined, {});
    state = reducer(state, loadExtract({
      egrid: 'CH123456789',
      identdn: 'foo',
      number: '1234',
      zoom: false
    }));
    state = reducer(state, showExtract({
      foo: 'bar'
    }));
    expect(state).toEqual({
      loading: false,
      zoom: false,
      visible: true,
      collapsed: false,
      error: false,
      egrid: 'CH123456789',
      identdn: 'foo',
      number: '1234',
      information: false,
      tab: 0,
      data: {
        foo: 'bar'
      },
      highlight: true,
      background: true
    });
  });

  it('should hide extract', () => {
    let state = reducer(undefined, {});
    state = reducer(state, loadExtract({
      egrid: 'CH123456789',
      identdn: 'foo',
      number: '1234',
      zoom: false
    }));
    state = reducer(state, showExtract({
      foo: 'bar'
    }));
    state = reducer(state, hideExtract());
    expect(state).toEqual({
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
    });
  });

  it('should show error', () => {
    window.history.pushState = vi.fn();
    let state = reducer(undefined, {});
    state = reducer(state, loadExtract({
      egrid: 'CH123456789',
      identdn: 'foo',
      number: '1234',
      zoom: false
    }));
    window.history.pushState = vi.fn();
    state = reducer(state, showError());
    expect(state).toEqual({
      loading: false,
      zoom: false,
      visible: false,
      collapsed: false,
      error: true,
      egrid: 'CH123456789',
      identdn: 'foo',
      number: '1234',
      information: false,
      tab: 0,
      data: {},
      highlight: true,
      background: true
    });
    expect(window.history.pushState).toHaveBeenCalled();
  });

  it('should toggle collapsed state', () => {
    let state = reducer(undefined, {});
    state = reducer(state, toggleCollapsed());
    expect(state).toEqual({
      loading: false,
      zoom: false,
      visible: false,
      collapsed: true,
      error: false,
      egrid: null,
      identdn: null,
      number: null,
      information: false,
      tab: 0,
      data: {},
      highlight: true,
      background: true
    });
    state = reducer(state, toggleCollapsed());
    expect(state).toEqual({
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
    });
  });

  it('should toggle information panel', () => {
    let state = reducer(undefined, {});
    state = reducer(state, setInformationPanelTab(1));
    state = reducer(state, toggleInformationPanel());
    expect(state).toEqual({
      loading: false,
      zoom: false,
      visible: false,
      collapsed: false,
      error: false,
      egrid: null,
      identdn: null,
      number: null,
      information: true,
      tab: 0,
      data: {},
      highlight: true,
      background: true
    });
    state = reducer(state, toggleInformationPanel());
    expect(state).toEqual({
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
    });
  });

  it('should toggle real estate highlight', () => {
    let state = reducer(undefined, {});
    state = reducer(state, toggleHighlight());
    expect(state).toEqual({
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
      highlight: false,
      background: true
    });
    state = reducer(state, toggleHighlight());
    expect(state).toEqual({
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
    });
  });

  it('should toggle background map', () => {
    let state = reducer(undefined, {});
    state = reducer(state, toggleBackground());
    expect(state).toEqual({
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
      background: false
    });
    state = reducer(state, toggleBackground());
    expect(state).toEqual({
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
    });
  });

  it('should set active information panel tab', () => {
    let state = reducer(undefined, {});
    state = reducer(state, setInformationPanelTab(1));
    expect(state).toEqual({
      loading: false,
      zoom: false,
      visible: false,
      collapsed: false,
      error: false,
      egrid: null,
      identdn: null,
      number: null,
      information: false,
      tab: 1,
      data: {},
      highlight: true,
      background: true
    });
  });

});
