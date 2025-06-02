import React from "react";
import {useDispatch} from "react-redux";

import {showError} from "../../reducer/extract";
import OerebExtractError from "./extract_error";

export default {
  title: "API Reference/Component/Extract/Error",
  component: OerebExtractError,
  tags: ["autodocs"]
};

export const Error = () => <OerebExtractError />;
Error.decorators = [
  (Story) => {
    const dispatch = useDispatch();
    dispatch(showError());
    return <Story />;
  }
];
