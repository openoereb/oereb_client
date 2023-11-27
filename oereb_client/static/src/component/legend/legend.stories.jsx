import React from "react";

import data from "../../../../../samples/extract.json";
import {groupRestrictionsByTopic} from "../../request/extract";
import OerebLegend from "./legend";

export default {
  title: 'API Reference/Component/Legend',
  component: OerebLegend
};

export const Legend = () => {
  const restrictions = groupRestrictionsByTopic(
    data.GetExtractByIdResponse.extract.RealEstate.RestrictionOnLandownership,
    data.GetExtractByIdResponse.extract.ConcernedTheme
  )['chBelasteteStandorteOeffentlicherVerkehr']['changeWithPreEffect'];
  return <OerebLegend restrictions={restrictions} />
};
