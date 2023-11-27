import React from "react";

import data from "../../../../../samples/extract.json";
import OerebRealEstate from "./real_estate";

export default {
  title: 'API Reference/Component/Real Estate',
  component: OerebRealEstate
};

export const RealEstate = () => <OerebRealEstate data={data.GetExtractByIdResponse.extract.RealEstate} />;
RealEstate.title = 'Real Estate';
