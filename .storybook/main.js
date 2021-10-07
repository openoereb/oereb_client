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
  ]
}