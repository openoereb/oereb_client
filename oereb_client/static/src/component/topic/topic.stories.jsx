import React from "react";

import data from "../../../../../samples/extract.json";
import {groupRestrictionsByTopic} from "../../request/extract";
import OerebTopic from "./topic";

export default {
  title: "API Reference/Component/Topic",
  component: OerebTopic,
  tags: ["autodocs"]
};

export const Topic = () => {
  const restrictions = groupRestrictionsByTopic(
    data.GetExtractByIdResponse.extract.RealEstate.RestrictionOnLandownership,
    data.GetExtractByIdResponse.extract.ConcernedTheme
  )["chBelasteteStandorteOeffentlicherVerkehr"]["changeWithPreEffect"];
  return <OerebTopic restrictions={restrictions} />
};
