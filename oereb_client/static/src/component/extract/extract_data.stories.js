import React from "react";

import OerebExtractData from './extract_data';
import data from "../../../../../samples/extract.json";
import {showExtract} from "../../reducer/extract";
import {useDispatch} from "react-redux";

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
