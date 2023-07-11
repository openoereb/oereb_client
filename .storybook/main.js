import remarkGfm from 'remark-gfm';
const path = require('path');
module.exports = {
  "stories": ["../docs/src/**/*.stories.mdx", "../oereb_client/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-react-i18next",
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          }
        }
      }
    }
  ],
  "webpackFinal": async (config, {
    configType
  }) => {
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    });
    return config;
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  docs: {
    autodocs: true
  }
};