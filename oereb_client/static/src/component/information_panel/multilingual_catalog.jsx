import {isObject, isString} from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {useSelector} from "react-redux";

import {getLocalizedText} from "../../util/language";

/**
 * The multilingual catalog is used to show the extract's glossary and disclaimer.
 * The value are sorted in alphabetical order and can be filtered by a search term.
 */
const OerebMultilingualCatalog = function (props) {
  const catalogName = props.catalog;
  const search = props.search;
  const extract = useSelector((state) => state.extract);
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;

  const validExtract =
    extract.visible &&
    isObject(extract.data) &&
    isObject(extract.data["GetExtractByIdResponse"]) &&
    isObject(extract.data["GetExtractByIdResponse"]["extract"]);

  if (!validExtract) {
    return null;
  }

  const highlight = function (item, highlight) {
    const parts = item.split(new RegExp(`(${highlight})`, "gi")).map((part, key) => {
      if (part.toLocaleLowerCase() === highlight.toLocaleLowerCase()) {
        return <mark className="ps-0 pe-0" key={key}>{part}</mark>;
      }
      return <span key={key}>{part}</span>;
    });
    return (
      <span>{parts}</span>
    );
  };

  const catalog = extract.data["GetExtractByIdResponse"]["extract"][catalogName];

  const localizedCatalog = catalog.map((item) => ({
    title: getLocalizedText(item["Title"], currentLanguage, defaultLanguage),
    content: getLocalizedText(item["Content"], currentLanguage, defaultLanguage)
  }))
    .filter((item) => {
      if (isString(search) && search.length > 0) {
        return (
          item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          item.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );
      }
      return true;
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  const catalogElements = localizedCatalog.map((item, key) => {
    let title = item.title;
    let content = item.content;
    if (isString(search) && search.length > 0) {
      title = highlight(title, search);
      content = highlight(content, search);
    }
    return (
      <li key={key} className="list-group-item">
        <p className="fw-bold m-0">
          {title}
        </p>
        <p className="m-0">
          {content}
        </p>
      </li>
    );
  });

  return (
    <div className="container-fluid oereb-client-catalog">
      <ul className="list-group list-group-flush">
        {catalogElements}
      </ul>
    </div>
  );
};

OerebMultilingualCatalog.propTypes = {

  /** The catalog data to be shown. */
  catalog: PropTypes.string.isRequired,

  /** The current value to filter the catalog entries for. */
  search: PropTypes.string

};

export default OerebMultilingualCatalog;
