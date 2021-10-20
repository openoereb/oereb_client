const path = require('path');

module.exports = {
  "stories": [
    "../docs/src/**/*.stories.mdx",
    "../oereb_client/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "core": {
    "builder": "webpack5"
  },
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "webpackFinal": async (config, { configType }) => {
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  }
}