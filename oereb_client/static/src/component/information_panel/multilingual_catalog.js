import {isObject, isString} from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {useSelector} from "react-redux";

import {getLocalizedText} from "../../util/language";

const OerebMultilingualCatalog = function(props) {
    const catalogName = props.catalog;
    const search = props.search;
    const extract = useSelector((state) => state.extract);
    const language = useSelector((state) => state.language).current;

    const validExtract =
        extract.visible &&
        isObject(extract.data) &&
        isObject(extract.data['GetExtractByIdResponse']) &&
        isObject(extract.data['GetExtractByIdResponse']['extract']);

    if (!validExtract) {
        return null;
    }

    const highlight = function(item, highlight) {
        const parts = item.split(new RegExp(`(${highlight})`, 'gi')).map((part, key) => {
            if (part.toLocaleLowerCase() === highlight.toLocaleLowerCase()) {
                return <mark className="ps-0 pe-0" key={key}>{part}</mark>;
            }
            return <span key={key}>{part}</span>;
        });
        return (
            <span>{parts}</span>
        );
    };

    const catalog = extract.data['GetExtractByIdResponse']['extract'][catalogName];

    const localizedCatalog = catalog.map((item) => ({
            title: getLocalizedText(item['Title'], language),
            content: getLocalizedText(item['Content'], language)
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
        <div className="container-fluid">
            <ul className="list-group list-group-flush">
                {catalogElements}
            </ul>
        </div>
    );
};

OerebMultilingualCatalog.propTypes = {
    catalog: PropTypes.string.isRequired,
    search: PropTypes.string
};

export default OerebMultilingualCatalog;
