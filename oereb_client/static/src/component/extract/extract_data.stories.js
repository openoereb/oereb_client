import React from "react";
import {useDispatch} from "react-redux";

import data from "../../../../../samples/extract.json";
import {showExtract} from "../../reducer/extract";
import OerebExtractData from './extract_data';

export default {
  title: 'API Reference/Component/Extract/Data',
  component: OerebExtractData
};

export const Data = () => <OerebExtractData />;
Data.decorators = [
  (Story) => {
    const dispatch = useDispatch();
    dispatch(showExtract(data));
    return <Story />
  }
];
