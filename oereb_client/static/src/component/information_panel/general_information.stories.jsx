import React from "react";
import {useDispatch} from "react-redux";

import data from "../../../../../samples/extract.json";
import {showExtract} from "../../reducer/extract";
import OerebGeneralInformation from "./general_information";

export default {
  title: "API Reference/Component/Information Panel/General Information",
  component: OerebGeneralInformation,
  tags: ["autodocs"]
};

export const GeneralInformation = () => <OerebGeneralInformation />;
GeneralInformation.title = "General Information";
GeneralInformation.decorators = [
  (Story) => {
    const dispatch = useDispatch();
    dispatch(showExtract(data));
    return <Story />
  }
];
