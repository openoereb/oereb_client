import {isArray, isEqual, isObject} from "lodash";

import {addIfNotContains} from "./array";

export const addDocumentIfNotContained = function (document, target) {
  const targetArray = target[document['Type']['Code']];
  if (isObject(target) && isArray(targetArray)) {
    for (var i = 0; i < targetArray.length; i++) {
      // Check if document already exists
      // (only use 'Title', 'OfficialNumber' and 'Lawstatus' for comparison)
      if (
        isEqual(targetArray[i]['Title'], document['Title']) &&
        isEqual(targetArray[i]['OfficialNumber'], document['OfficialNumber']) &&
        isEqual(targetArray[i]['Lawstatus'], document['Lawstatus'])
      ) {
        // Add missing article numbers if document already exists
        for (var j = 0; j < document['ArticleNumber'].length; j++) {
          addIfNotContains(document['ArticleNumber'][j], targetArray[i]['ArticleNumber']);
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
