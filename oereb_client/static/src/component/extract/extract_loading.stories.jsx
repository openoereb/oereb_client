import React from "react";
import {useDispatch} from "react-redux";

import {loadExtract} from "../../reducer/extract";
import OerebExtractLoading from "./extract_loading";

export default {
  title: "API Reference/Component/Extract/Loading",
  component: OerebExtractLoading,
  tags: ["autodocs"]
};

export const Loading = () => <OerebExtractLoading />;
Loading.decorators = [
  (Story) => {
    const dispatch = useDispatch();
    dispatch(loadExtract({
      egrid: "CH1234567890",
      zoom: false
    }));
    return <Story />
  }
];
