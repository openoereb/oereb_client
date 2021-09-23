import {isString} from "lodash";

const regex = new RegExp('({([\\w]*)})', 'g');

export const format = function (input, values) {
  if (isString(input)) {
    let result = input;
    let match = regex.exec(input);
    while (match !== null) {
      result = result.replace(match[1], values[match[2]] || '');
      match = regex.exec(input);
    }
    return result;
  }
  return input;
};
