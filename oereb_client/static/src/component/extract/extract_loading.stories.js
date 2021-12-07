import React from "react";

import OerebExtractLoading from './extract_loading';
import {loadExtract} from "../../reducer/extract";
import {useDispatch} from "react-redux";

export default {
  title: 'API Reference/Component/Extract/Loading',
  component: OerebExtractLoading
};

export const Loading = () => <OerebExtractLoading />;
Loading.decorators = [
  (Story) => {
    const dispatch = useDispatch();
    dispatch(loadExtract({
      egrid: 'CH1234567890',
      zoom: false
    }));
    return <Story />
  }
];
