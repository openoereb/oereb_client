import {isArray, isEqual} from "lodash";

export const addIfNotContains = function (item, target) {
  if (isArray(target)) {
    for (var i = 0; i < target.length; i++) {
      if (isEqual(target[i], item)) {
        return;
      }
    }
    target.push(item);
  }
};
