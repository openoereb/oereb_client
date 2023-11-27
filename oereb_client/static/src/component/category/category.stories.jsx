import React from "react";
import {useDispatch} from "react-redux";

import data from "../../../../../samples/extract.json";
import {showExtract} from "../../reducer/extract";
import OerebCategory from "./category";

export default {
  title: 'API Reference/Component/Category',
  component: OerebCategory
};

export const ConcernedTheme = () => {
  const dispatch = useDispatch();
  dispatch(showExtract(data));
  return (
    <OerebCategory title="Concerned theme"
      data={data['GetExtractByIdResponse']['extract']['ConcernedTheme']}
      restriction={true} />
  );
};
ConcernedTheme.title = 'Concerned theme';

export const NotConcernedTheme = () => {
  const dispatch = useDispatch();
  dispatch(showExtract(data));
  return (
    <OerebCategory title="Not concerned theme"
      data={data['GetExtractByIdResponse']['extract']['NotConcernedTheme']} />
  );
};
NotConcernedTheme.title = 'Not concerned theme';

export const ThemeWithoutData = () => {
  const dispatch = useDispatch();
  dispatch(showExtract(data));
  return (
    <OerebCategory title="Theme without data"
      data={data['GetExtractByIdResponse']['extract']['ThemeWithoutData']} />
  );
};
ThemeWithoutData.title = 'Theme without data';
