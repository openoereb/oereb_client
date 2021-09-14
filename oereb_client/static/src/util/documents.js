import {isArray, isEqual, isObject} from "lodash";

import {addIfNotContains} from "./array";

export const addDocumentIfNotContained = function(document, target) {
    const targetArray = target[document['DocumentType']];
    if (isObject(target) && isArray(targetArray)) {
        for (var i = 0; i < targetArray.length; i++) {
            // Check if document already exists (only use 'Title', 'OfficialNumber' and 'TextAtWeb' for comparison)
            if (
                isEqual(targetArray[i]['Title'], document['Title']) &&
                isEqual(targetArray[i]['OfficialNumber'], document['OfficialNumber'])
            ) {
            // Add missing article numbers if document already exists
                for (var j = 0; j < document['ArticleNumber'].length; j++) {
                    addIfNotContains(document['ArticleNumber'][j], targetArray[i]['ArticleNumber']);
                }
                // Add missing articles if document already exists
                for (var k = 0; k < document['Article'].length; k++) {
                    addIfNotContains(document['Article'][k], targetArray[i]['Article']);
                }
                // Add missing files if document already exists
                for (var l = 0; l < document['TextAtWeb'].length; l++) {
                    addIfNotContains(document['TextAtWeb'][l], targetArray[i]['TextAtWeb']);
                }
                return;
            }
        }
        // Add document if it is missing
        targetArray.push(document);
    }
};

export const addDocumentsIfNotContained = function(documents, target) {
    // Iterate documents to be added
    if (isArray(documents) && isObject(target)) {
        for (var i = 0; i < documents.length; i++) {
            // Create document object with necessary properties and check if it needs to be added
            addDocumentIfNotContained({
                'DocumentType': documents[i]['DocumentType'],
                'Title': documents[i]['Title'],
                'Abbreviation': documents[i]['Abbreviation'],
                'OfficialNumber': documents[i]['OfficialNumber'],
                'ArticleNumber': documents[i]['ArticleNumber'] || [],
                'Article': documents[i]['Article'] || [],
                'TextAtWeb': [documents[i]['TextAtWeb']]
            }, target);
            // Do the same for possible references
            var references = documents[i]['Reference'];
            if (isArray(references)) {
                addDocumentsIfNotContained(references, target);
            }
        }
    }
};
