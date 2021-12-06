import {Provider} from 'react-redux';
import {update} from '../oereb_client/static/src/reducer/config';
import {themes} from '@storybook/theming';
import MainStore from '../oereb_client/static/src/store/main';
import config from './oereb_client.json';
import OerebTheme from './theme';

export const decorators = [
  (Story) => {
    let cfg = config['oereb_client'];
    cfg['application_url'] = 'https://example.com';
    update(cfg);
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
