import './style.scss';
import {Provider} from 'react-redux';
import {update} from '../oereb_client/static/src/reducer/config';
import {initLanguages} from '../oereb_client/static/src/reducer/language';
import MainStore from '../oereb_client/static/src/store/main';
import config from './oereb_client.json';
import OerebTheme from './theme';
import {useDispatch} from 'react-redux';
import _ from 'lodash';

export const decorators = [
  (Story) => {
    const dispatch = useDispatch();
    const cfg = _.merge({
      application: {
        logo_oereb: [
          {
            Language: 'en',
            URL: 'samples/static/logo_oereb.png'
          }
        ]
      },
      application_url: 'https://example.com',
      service_url: 'https://example.com'
    }, config['oereb_client']);
    dispatch(update(cfg));
    dispatch(initLanguages({
      available: cfg['application']['languages'],
      default: cfg['application']['default_language']
    }));
    return <Story />;
  },
  (Story) => {
    return (
      <Provider store={MainStore}>
        <Story />
      </Provider>
    );
  }
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        'OeREB Client',
        'User Guide',
        [
          'Installation',
          'Configuration'
        ],
        'API Reference'
      ]
    }
  },
  previewTabs: {
    canvas: {
        hidden: true,
    },
  },
  viewMode: 'docs',
  docs: {
    theme: OerebTheme
  }
}
