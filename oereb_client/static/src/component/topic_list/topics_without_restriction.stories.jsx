import React from "react";

import data from "../../../../../samples/extract.json";
import OerebTopicsWithoutRestriction from "./topics_without_restriction";

export default {
  title: 'API Reference/Component/Topic List/Without Restriction',
  component: OerebTopicsWithoutRestriction,
  tags: ['autodocs']
};

export const WithoutRestriction = () => <OerebTopicsWithoutRestriction
  data={data['GetExtractByIdResponse']['extract']['ConcernedTheme']} />;
WithoutRestriction.title = 'Without Restriction';
