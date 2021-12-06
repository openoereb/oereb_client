import {create} from '@storybook/theming';
import logo from '../docs/src/logo.png';

export default create({
  base: 'light',
  colorPrimary: 'red',
  colorSecondary: '#205c90',
  appBg: '#e6f2f2',
  appContentBg: 'white',
  inputBorder: '#205c90',
  brandTitle: 'OeREB Client',
  brandUrl: 'https://github.com/openoereb/oereb_client',
  brandImage: logo
});
