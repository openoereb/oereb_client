import {isString} from "lodash";

const regex = new RegExp('({([\\w]*)})', 'g');

export const format = function (input, values) {
  if (isString(input)) {
    let result = input;
    let match;
    while ((match = regex.exec(input)) !== null) {
      result = result.replace(match[1], values[match[2]] || '');
    }
    return result;
  }
  return input;
};
