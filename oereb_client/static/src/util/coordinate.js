import {isArray} from "lodash";
import Point from "ol/geom/Point";

const reLV03 = new RegExp('^(\\d{6}(\\.\\d+)?)(\\s|,\\s?|;\\s?)(\\d{6}(\\.\\d+)?)');
const reLV95 = new RegExp('^(\\d{7}(\\.\\d+)?)(\\s|,\\s?|;\\s?)(\\d{7}(\\.\\d+)?)');
const reGNSS = new RegExp('^(\\d{1}(\\.\\d+)?)(\\s|,\\s?|;\\s?)(\\d{2}(\\.\\d+)?)');

const parseCoordinateMatch = function(match) {
  if (isArray(match)) {
    return [
      parseFloat(match[1]),
      parseFloat(match[4])
    ]
  }
  return null;
};

export const isLV03 = function(value) {
  return reLV03.test(value);
};

export const isLV95 = function(value) {
  return reLV95.test(value);
};

export const isGNSS = function(value) {
  return reGNSS.test(value);
};

export const getCoordinates = function(value) {
  if (isGNSS(value)) {
    const coords = parseCoordinateMatch(reGNSS.exec(value));
    return new Point(coords).transform('EPSG:4326', 'EPSG:2056').getCoordinates();
  }
  else if (isLV03(value)) {
    const coords = parseCoordinateMatch(reLV03.exec(value));
    return new Point(coords).transform('EPSG:21781', 'EPSG:2056').getCoordinates();
  }
  else if (isLV95(value)) {
    return parseCoordinateMatch(reLV95.exec(value));
  }
  return null;
}
