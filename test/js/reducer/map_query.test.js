import reducer, {
  hide,
  loadAt,
  show} from '../../../oereb_client/static/src/reducer/map_query';

describe('map query reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      visible: false,
      posX: 0.0,
      posY: 0.0,
      results: []
    });
  });

  it('should load a specified position', () => {
    let state = reducer(undefined, {});
    state = reducer(state, loadAt({
      posX: 100.0,
      posY: 200.0
    }));
    expect(state).toEqual({
      loading: true,
      visible: false,
      posX: 100.0,
      posY: 200.0,
      results: []
    });
  });

  it('should show a specified position', () => {
    let state = reducer(undefined, {});
    state = reducer(state, loadAt({
      posX: 100.0,
      posY: 200.0
    }));
    state = reducer(state, show({
      results: [1, 2, 3]
    }));
    expect(state).toEqual({
      loading: false,
      visible: true,
      posX: 100.0,
      posY: 200.0,
      results: [1, 2, 3]
    });
  });

  it('should hide map query tool', () => {
    let state = reducer(undefined, {});
    state = reducer(state, loadAt({
      posX: 100.0,
      posY: 200.0
    }));
    state = reducer(state, show({
      results: [1, 2, 3]
    }));
    state = reducer(state, hide({
      results: [1, 2, 3]
    }));
    expect(state).toEqual({
      loading: false,
      visible: false,
      posX: 100.0,
      posY: 200.0,
      results: [1, 2, 3]
    });
  });

});
