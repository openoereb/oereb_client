import reducer, {
  initLanguages,
  setLanguage
} from '../../../oereb_client/static/src/reducer/language';

describe('language reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      current: null,
      default: null,
      available: []
    });
  });

  it('should init languages', () => {
    let state = reducer(undefined, {});
    state = reducer(state, initLanguages({
      default: 'en',
      available: ['en', 'de', 'fr']
    }));
    expect(state).toEqual({
      current: 'en',
      default: 'en',
      available: ['en', 'de', 'fr']
    });
  });

  it('should init languages using parameter', () => {
    const query = new URLSearchParams(window.location.search);
    query.set('lang', 'de');
    window.history.pushState(null, null, '?' + query.toString());
    let state = reducer(undefined, {});
    state = reducer(state, initLanguages({
      default: 'en',
      available: ['en', 'de', 'fr']
    }));
    expect(state).toEqual({
      current: 'de',
      default: 'en',
      available: ['en', 'de', 'fr']
    });
  });

  it('should set current language', () => {
    let state = reducer(undefined, {});
    state = reducer(state, initLanguages({
      default: 'en',
      available: ['en', 'de', 'fr']
    }));
    state = reducer(state, setLanguage('de'));
    expect(state).toEqual({
      current: 'de',
      default: 'en',
      available: ['en', 'de', 'fr']
    });
    const query = new URLSearchParams(window.location.search);
    expect(query.get('lang')).toEqual('de');
  });

});
