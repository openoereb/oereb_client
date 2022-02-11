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

export const getParentTheme = function(theme, concernedThemes) {
  let result = null;
  concernedThemes.forEach((parent) => {
    if (parent.Code === theme.Code) {
      result = parent;
      return null;
    }
  });
  return result;
};

export const groupRestrictionsByTopic = function (restrictions, concernedThemes) {
  const restrictionsByTopic = {};
  restrictions.forEach((restriction) => {
    const code = sanitizeTopicCode(restriction.Theme);
    const lawstatus = restriction.Lawstatus.Code;
    if (!Reflect.apply(Object.prototype.hasOwnProperty, restrictionsByTopic, [code])) {
      let themeText = null;
      let subThemeText = null;
      if (isString(restriction.Theme.SubCode)) {
        subThemeText = restriction.Theme.Text;
        themeText = getParentTheme(restriction.Theme, concernedThemes).Text;
      }
      else {
        themeText = restriction.Theme.Text;
      }
      restrictionsByTopic[code] = {
        themeText: themeText,
        subThemeText: subThemeText,
        inForce: [],
        changeWithPreEffect: [],
        changeWithoutPreEffect: []
      };
    }
    restrictionsByTopic[code][lawstatus].push(restriction);
  });
  return restrictionsByTopic;
};
