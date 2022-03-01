import {
  groupRestrictionsByTopic,
  queryExtractById,
  queryStaticExtractById,
  sanitizeTopicCode
} from "../../../oereb_client/static/src/request/extract";

beforeEach(() => {
  fetch.resetMocks();
  jest.useFakeTimers().setSystemTime(new Date('2022-01-01').getTime());
});

describe('queryExtractById', () => {

  it('should query the extract for the specified id', async () => {
    fetch.mockResponseOnce(JSON.stringify({foo: 'bar'}));
    const result = await queryExtractById(
      'http://example.com/',
      'CH1234567890',
      1,
      'de'
    );
    expect(result).toEqual({
      foo: 'bar'
    });
    expect(fetch.mock.calls).toHaveLength(1);
    const url = new URL(fetch.mock.calls[0][0]);
    expect(url.host).toEqual('example.com');
    expect(url.pathname).toEqual('/extract/json/');
    expect(url.searchParams.get('EGRID')).toEqual('CH1234567890');
    expect(url.searchParams.get('LANG')).toEqual('de');
    expect(url.searchParams.get('_dc')).toEqual('1640995200000');
  });

});

describe('queryStaticExtractById', () => {

  it('should query the static extract for the specified id', async () => {
    fetch.mockResponseOnce('foo');
    const result = await queryStaticExtractById(
      'http://example.com/',
      'CH1234567890',
      1,
      'de'
    );
    const resultStr = Reflect.apply(String.fromCharCode, undefined, new Uint8Array(result));
    expect(resultStr).toEqual('foo');
    expect(fetch.mock.calls).toHaveLength(1);
    const url = new URL(fetch.mock.calls[0][0]);
    expect(url.host).toEqual('example.com');
    expect(url.pathname).toEqual('/extract/pdf/');
    expect(url.searchParams.get('EGRID')).toEqual('CH1234567890');
    expect(url.searchParams.get('LANG')).toEqual('de');
    expect(url.searchParams.get('_dc')).toEqual('1640995200000');
  });

});

describe('sanitizeTopicCode', () => {

  it('should replace invalid characters', () => {
    const theme = {
      Code: 'ch.My-Example_Topic',
      SubCode: 'with.Included_Sub-Topic'
    };
    const result = sanitizeTopicCode(theme);
    expect(result).toEqual('chMyExampleTopic_withIncludedSubTopic');
  });

});

describe('groupRestrictionsByTopic', () => {

  it('should group the restrictions by their topics', () => {
    const restrictions = [
      {
        Theme: {
          Code: 'ch.Topic1',
          SubCode: 'ch.SubTopic1'
        },
        Lawstatus: {
          Code: 'inForce'
        }
      },
      {
        Theme: {
          Code: 'ch.Topic1',
          SubCode: 'ch.SubTopic1'
        },
        Lawstatus: {
          Code: 'inForce'
        }
      },
      {
        Theme: {
          Code: 'ch.Topic1',
          SubCode: 'ch.SubTopic2'
        },
        Lawstatus: {
          Code: 'inForce'
        }
      },
      {
        Theme: {
          Code: 'ch.Topic1',
          SubCode: 'ch.SubTopic1'
        },
        Lawstatus: {
          Code: 'changeWithPreEffect'
        }
      },
      {
        Theme: {
          Code: 'ch.Topic2'
        },
        Lawstatus: {
          Code: 'changeWithPreEffect'
        }
      },
      {
        Theme: {
          Code: 'ch.Topic2'
        },
        Lawstatus: {
          Code: 'changeWithoutPreEffect'
        }
      }
    ];
    const concernedThemes = [
      {
        Code: 'ch.Topic1'
      },
      {
        Code: 'ch.Topic2'
      }
    ];
    const result = groupRestrictionsByTopic(restrictions, concernedThemes);
    expect(result['chTopic1_chSubTopic1']['inForce']).toHaveLength(2);
    expect(result['chTopic1_chSubTopic1']['changeWithPreEffect']).toHaveLength(1);
    expect(result['chTopic1_chSubTopic1']['changeWithoutPreEffect']).toHaveLength(0);
    expect(result['chTopic1_chSubTopic2']['inForce']).toHaveLength(1);
    expect(result['chTopic1_chSubTopic2']['changeWithPreEffect']).toHaveLength(0);
    expect(result['chTopic1_chSubTopic2']['changeWithoutPreEffect']).toHaveLength(0);
    expect(result['chTopic2']['inForce']).toHaveLength(0);
    expect(result['chTopic2']['changeWithPreEffect']).toHaveLength(1);
    expect(result['chTopic2']['changeWithoutPreEffect']).toHaveLength(1);
  });

});
