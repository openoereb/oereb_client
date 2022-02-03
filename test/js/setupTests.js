import 'regenerator-runtime/runtime';

import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import fetchMock from "jest-fetch-mock";

Enzyme.configure({
  adapter: new EnzymeAdapter()
});

fetchMock.enableMocks();
