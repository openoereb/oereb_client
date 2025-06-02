import "./documents.scss";

import {isArray} from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {addDocumentIfNotContained} from "../../util/documents";
import {getLocalizedText} from "../../util/language";

const getDocuments = function (restrictions) {
  const documents = {
    "LegalProvision": [],
    "Law": [],
    "Hint": []
  };
  restrictions.forEach((restriction) => {
    // Iterate the legal provisions for each restriction
    const legalProvisions = restriction["LegalProvisions"];
    legalProvisions.forEach((document) => {
      // Create legal provision object with necessary properties and check if it needs to be added
      addDocumentIfNotContained({
        "Type": document["Type"],
        "Title": document["Title"],
        "Abbreviation": document["Abbreviation"],
        "OfficialNumber": document["OfficialNumber"],
        "ArticleNumber": document["ArticleNumber"] || [],
        "Article": document["Article"] || [],
        "TextAtWeb": [document["TextAtWeb"]],
        "Index": document["Index"]
      }, documents);
    });
  });
  return documents;
};

const formatTitle = function (doc, language, defaultLanguage) {
  let title = getLocalizedText(doc["Title"], language, defaultLanguage);
  if (isArray(doc["Abbreviation"]) && doc["Abbreviation"].length > 0) {
    title += " (" + getLocalizedText(doc["Abbreviation"], language, defaultLanguage) + ")";
  }
  if (isArray(doc["OfficialNumber"]) && doc["OfficialNumber"].length > 0) {
    title += ", " + getLocalizedText(doc["OfficialNumber"], language, defaultLanguage);
  }
  return title;
};

const formatDocument = function (doc, docKey, language, defaultLanguage) {
  const articleNumbers = doc["ArticleNumber"].map((number, key) =>
    <span key={key}>
      &nbsp;<span className="badge bg-primary">{number}</span>
    </span>
  );
  const urls = doc["TextAtWeb"].map((url, key) => {
    const localizedUrl = getLocalizedText(url, language, defaultLanguage);
    return (
      <li key={key}>
        <a href={localizedUrl} target="_blank" rel="noreferrer">
          {localizedUrl}
        </a>
      </li>
    );
  });
  return (
    <dd key={docKey} className="oereb-client-document ms-2">
      <span>{formatTitle(doc, language, defaultLanguage)}</span>
      {articleNumbers}
      <ul className="ps-2 mb-2">
        {urls}
      </ul>
    </dd>
  );
}

/**
 * A component containing the legal documents of a certain topic. The documents are separeted in
 * three categories: legal provisions, legal bases and hints.
 */
const OerebDocuments = function (props) {
  const {t} = useTranslation();
  const restrictions = props.restrictions;
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;
  const documents = getDocuments(restrictions);

  const getLegalProvisionsTitle = function () {
    if (documents["LegalProvision"].length > 0) {
      return (
        <dt>{t("extract.topic.document.legal_provisions")}</dt>
      );
    }
    return null;
  };
  const legalProvisions = documents["LegalProvision"]
    .sort((a, b) => a.Index - b.Index)
    .map((doc, key) => formatDocument(doc, key, currentLanguage, defaultLanguage));

  const getLawsTitle = function () {
    if (documents["Law"].length > 0) {
      return (
        <dt>{t("extract.topic.document.laws")}</dt>
      );
    }
    return null;
  };
  const laws = documents["Law"]
    .sort((a, b) => a.Index - b.Index)
    .map((doc, key) => formatDocument(doc, key, currentLanguage, defaultLanguage));

  const getHintsTitle = function () {
    if (documents["Hint"].length > 0) {
      return (
        <dt>{t("extract.topic.document.hints")}</dt>
      );
    }
    return null;
  };
  const hints = documents["Hint"]
    .sort((a, b) => a.Index - b.Index)
    .map((doc, key) => formatDocument(doc, key, currentLanguage, defaultLanguage));

  return (
    <dl className="oereb-client-documents mb-2">
      {getLegalProvisionsTitle()}
      {legalProvisions}
      {getLawsTitle()}
      {laws}
      {getHintsTitle()}
      {hints}
    </dl>
  );
};

OerebDocuments.propTypes = {

  /** The list of restrictions for which to collect the documents. */
  restrictions: PropTypes.array.isRequired

};

export default OerebDocuments;
