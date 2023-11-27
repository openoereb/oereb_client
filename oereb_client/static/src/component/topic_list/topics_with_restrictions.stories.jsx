import React from "react";

import data from "../../../../../samples/extract.json";
import {groupRestrictionsByTopic} from "../../request/extract";
import OerebTopicsWithRestriction from "./topics_with_restrictions";

export default {
  title: 'API Reference/Component/Topic List/With Restrictions',
  component: OerebTopicsWithRestriction
};

export const WithRestrictions = () => {
  const restrictions = groupRestrictionsByTopic(
    data.GetExtractByIdResponse.extract.RealEstate.RestrictionOnLandownership,
    data.GetExtractByIdResponse.extract.ConcernedTheme
  );
  return <OerebTopicsWithRestriction data={data['GetExtractByIdResponse']['extract']['ConcernedTheme']}
    restrictions={restrictions} />;
};
WithRestrictions.title = 'With Restrictions';
