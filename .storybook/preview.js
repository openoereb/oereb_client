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
  }
}