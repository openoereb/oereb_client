import React from "react";

import data from "../../../../../samples/extract.json";
import {groupRestrictionsByTopic} from "../../request/extract";
import OerebDocuments from "./documents";

export default {
  title: 'API Reference/Component/Documents',
  component: OerebDocuments
};

export const Documents = () => {
  const restrictions = groupRestrictionsByTopic(
    data.GetExtractByIdResponse.extract.RealEstate.RestrictionOnLandownership,
    data.GetExtractByIdResponse.extract.ConcernedTheme
  )['chBelasteteStandorteOeffentlicherVerkehr']['changeWithPreEffect'];
  return <OerebDocuments restrictions={restrictions} />
};
