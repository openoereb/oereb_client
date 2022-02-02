import 'regenerator-runtime/runtime';
import Enzyme from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import fetchMock from "jest-fetch-mock";

Enzyme.configure({
  adapter: new EnzymeAdapter()
});

fetchMock.enableMocks();
