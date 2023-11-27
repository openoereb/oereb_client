import { mergeConfig } from 'vite';
import remarkGfm from 'remark-gfm';

export default {
  stories: [
    '../docs/src/**/*.stories.mdx',
    '../oereb_client/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
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
  docs: {
    autodocs: true
  },
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

// module.exports = {
//   stories: ["../docs/src/**/*.stories.mdx", "../oereb_client/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
//   core: {
//     builder: '@storybook/builder-vite'
//   },
//   addons: [
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "storybook-react-i18next",
//     {
//       name: '@storybook/addon-docs',
//       options: {
//         mdxPluginOptions: {
//           mdxCompileOptions: {
//             remarkPlugins: [remarkGfm],
//           }
//         }
//       }
//     }
//   ],
//   framework: '@storybook/react-vite',
//   docs: {
//     autodocs: true
//   }
// };