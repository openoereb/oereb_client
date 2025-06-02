import { mergeConfig } from 'vite';
import remarkGfm from 'remark-gfm';

export default {
  stories: [
    '../docs/src/**/*.mdx',
    '../oereb_client/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  addons: [
    "@storybook/addon-links",
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
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add storybook-specific dependencies to pre-optimization
      optimizeDeps: {
        include: ['storybook-addon-docs'],
      },
    });
  },
 };
