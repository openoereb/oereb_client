import {queryEgridByCoord} from "../../../oereb_client/static/src/request/egrid";

beforeEach(() => {
  fetch.resetMocks();
  vi.useFakeTimers().setSystemTime(new Date('2022-01-01').getTime());
});

describe('queryEgridByCoord', () => {

  it('should query the real estates at the specified position', async () => {
    fetch.mockResponseOnce(JSON.stringify({foo: 'bar'}));
    const result = await queryEgridByCoord('http://example.com/', [100, 200]);
    expect(result).toEqual({
      foo: 'bar'
    });
    expect(fetch.mock.calls).toHaveLength(1);
    const url = new URL(fetch.mock.calls[0][0]);
    expect(url.host).toEqual('example.com');
    expect(url.pathname).toEqual('/getegrid/json/');
    expect(url.searchParams.get('EN')).toEqual('100,200');
    expect(url.searchParams.get('_dc')).toEqual('1640995200000');
  });

});
