import {isString} from "lodash";

export const queryExtractById = function (serviceUrl, egrid, timeout, language) {
  const url = new URL(serviceUrl + 'extract/json/');
  url.searchParams.append('EGRID', egrid);
  url.searchParams.append('GEOMETRY', true);
  url.searchParams.append('_dc', new Date().getTime());
  if (language) {
    url.searchParams.append('LANG', language);
  }
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout * 1000);
    fetch(url, {signal: controller.signal})
      .then((response) => {
        clearTimeout(timer);
        if (!response.ok) {
          reject(new Error(response.text()));
        }
        resolve(response.json());
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
};

export const queryStaticExtractById = function (serviceUrl, egrid, timeout, language) {
  const url = new URL(serviceUrl + 'extract/pdf/');
  url.searchParams.append('EGRID', egrid);
  url.searchParams.append('_dc', new Date().getTime());
  if (language) {
    url.searchParams.append('LANG', language);
  }
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout * 1000);
    fetch(url, {signal: controller.signal})
      .then((response) => {
        clearTimeout(timer);
        if (!response.ok) {
          reject(new Error(response.text()));
        }
        resolve(response.arrayBuffer());
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
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
        text: restriction.Theme.Text,
        inForce: [],
        changeWithPreEffect: [],
        changeWithoutPreEffect: []
      };
    }
    restrictionsByTopic[code][lawstatus].push(restriction);
  });
  return restrictionsByTopic;
};
