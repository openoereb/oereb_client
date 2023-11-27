import React from "react";

import data from "../../../../../samples/extract.json";
import {groupRestrictionsByTopic} from "../../request/extract";
import OerebResponsibleOffice from "./responsible_office";

export default {
  title: 'API Reference/Component/Responsible Office',
  component: OerebResponsibleOffice
};

export const ResponsibleOffice = () => {
  const restrictions = groupRestrictionsByTopic(
    data.GetExtractByIdResponse.extract.RealEstate.RestrictionOnLandownership,
    data.GetExtractByIdResponse.extract.ConcernedTheme
  )['chBelasteteStandorteOeffentlicherVerkehr']['changeWithPreEffect'];
  return <OerebResponsibleOffice restrictions={restrictions} />
};
ResponsibleOffice.title = 'Responsible Office';
