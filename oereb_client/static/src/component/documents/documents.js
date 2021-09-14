import './documents.scss';

import {isArray, isString} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {useSelector} from 'react-redux';

import {addDocumentIfNotContained, addDocumentsIfNotContained} from '../../util/documents';
import {getLocalizedText} from '../../util/language';

const getDocuments = function(restrictions) {
    const documents = {
        'LegalProvision': [],
        'Law': [],
        'Hint': []
    };
    restrictions.forEach((restriction) => {
        // Iterate the legal provisions for each restriction
        const legalProvisions = restriction['LegalProvisions'];
        legalProvisions.forEach((legalProvision) => {
            // Create legal provision object with necessary properties and check if it needs to be added
            addDocumentIfNotContained({
                'DocumentType': legalProvision['DocumentType'],
                'Title': legalProvision['Title'],
                'Abbreviation': legalProvision['Abbreviation'],
                'OfficialNumber': legalProvision['OfficialNumber'],
                'ArticleNumber': legalProvision['ArticleNumber'] || [],
                'Article': legalProvision['Article'] || [],
                'TextAtWeb': [legalProvision['TextAtWeb']]
            }, documents);
            // Add possible references to the documents
            const references = legalProvision['Reference'];
            if (isArray(references)) {
                addDocumentsIfNotContained(references, documents);
            }
        });
    });
    return documents;
};

const formatTitle = function(doc, language) {
    let title = getLocalizedText(doc['Title'], language);
    if (isArray(doc['Abbreviation']) && doc['Abbreviation'].length > 0) {
      title += ' (' + getLocalizedText(doc['Abbreviation'], language) + ')';
    }
    if (isString(doc['OfficialNumber'])) {
      title += ', ' + doc['OfficialNumber'];
    }
    return title;
};

const formatDocument = function(doc, language) {
    const articleNumbers = doc['ArticleNumber'].map((number) => 
        <span>
            &nbsp;<span class="badge bg-primary">{number}</span>
        </span>
    );
    const urls = doc['TextAtWeb'].map((url) => {
        const localizedUrl = getLocalizedText(url, language);
        return (
            <li>
                <a href={localizedUrl} target="_blank">
                    {localizedUrl}
                </a>
            </li>
        );
    });
    return (
        <dd className="ms-2">
            <span>{formatTitle(doc, language)}</span>
            {articleNumbers}
            <ul class="ps-2 mb-2">
                {urls}
            </ul>
        </dd>
    );
}

const OerebDocuments = function(props) {
    const restrictions = props.restrictions;
    const language = useSelector((state) => state.language).current;
    const documents = getDocuments(restrictions);

    const getLegalProvisionsTitle = function() {
        if (documents['LegalProvision'].length > 0) {
            return (
                <dt>Rechtsvorschriften</dt>
            );
        }
        return null;
    };
    const legalProvisions = documents['LegalProvision'].map((doc) => formatDocument(doc, language));

    const getLawsTitle = function() {
        if (documents['Law'].length > 0) {
            return (
                <dt>Gesetzliche Grundlagen</dt>
            );
        }
        return null;
    };
    const laws = documents['Law'].map((doc) => formatDocument(doc, language));

    const getHintsTitle = function() {
        if (documents['Hint'].length > 0) {
            return (
                <dt>Weitere Informationen und Hinweise</dt>
            );
        }
        return null;
    };
    const hints = documents['Hint'].map((doc) => formatDocument(doc, language));

    return (
        <dl className="oereb-documents border-top pt-2">
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
    restrictions: PropTypes.array.isRequired
};

export default OerebDocuments;
