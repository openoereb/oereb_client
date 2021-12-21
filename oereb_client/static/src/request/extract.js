import {isString} from "lodash";

export const queryExtractById = function (serviceUrl, egrid, language) {
  const url = new URL(serviceUrl + 'extract/json/');
  url.searchParams.append('EGRID', egrid);
  url.searchParams.append('GEOMETRY', true);
  url.searchParams.append('_dc', new Date().getTime());
  if (language) {
    url.searchParams.append('LANG', language);
  }
  return fetch(url).then((response) => response.json());
};

export const queryStaticExtractById = function (serviceUrl, egrid, language) {
  const url = new URL(serviceUrl + 'extract/pdf/');
  url.searchParams.append('EGRID', egrid);
  url.searchParams.append('_dc', new Date().getTime());
  if (language) {
    url.searchParams.append('LANG', language);
  }
  return fetch(url).then((response) => response.arrayBuffer());
};

export const sanitizeTopicCode = function (theme) {
  let code = theme.Code.replace('.', '').replace('-', '').replace('_', '');
  if (isString(theme.SubCode)) {
    code += '_' + theme.SubCode.replace('.', '').replace('-', '').replace('_', '');
  }
  return code;
};

export const groupRestrictionsByTopic = function (restrictions) {
  const restrictionsByTopic = {};
  restrictions.forEach((restriction) => {
    const code = sanitizeTopicCode(restriction.Theme);
    const lawstatus = restriction.Lawstatus.Code;
    if (!Reflect.apply(Object.prototype.hasOwnProperty, restrictionsByTopic, [code])) {
      restrictionsByTopic[code] = {
        inForce: [],
        changeWithPreEffect: [],
        changeWithoutPreEffect: []
      };
    }
    restrictionsByTopic[code][lawstatus].push(restriction);
  });
  return restrictionsByTopic;
};
