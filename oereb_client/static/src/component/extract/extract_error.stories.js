import React from "react";

import OerebExtractError from './extract_error';
import {showError} from "../../reducer/extract";
import {useDispatch} from "react-redux";

export default {
  title: 'API Reference/Component/Extract/Error',
  component: OerebExtractError
};

export const Error = () => <OerebExtractError />;
Error.decorators = [
  (Story) => {
    const dispatch = useDispatch();
    dispatch(showError());
    return <Story />
  }
];
