import {isString} from "lodash";

export const queryExtractById = function (serviceUrl, egrid, identdn, number, timeout, language) {
  const url = new URL(serviceUrl + 'extract/json/');
  if (isString(egrid)) {
    url.searchParams.append('EGRID', egrid);
  }
  else {
    url.searchParams.append('IDENTDN', identdn);
    url.searchParams.append('NUMBER', number);
  }
  url.searchParams.append('GEOMETRY', true);
  url.searchParams.append('_dc', new Date().getTime());
  if (language) {
    url.searchParams.append('LANG', language);
  }
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout * 1000);
    fetch(url.toString(), {signal: controller.signal})
      .then((response) => {
        clearTimeout(timer);
        if (response.ok) {
          resolve(response.json());
        }
        else {
          reject(new Error(response.text()));
        }
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
};

export const queryStaticExtractById = function (serviceUrl, egrid, identdn, number, timeout, language) {
  const url = new URL(serviceUrl + 'extract/pdf/');
  if (isString(egrid)) {
    url.searchParams.append('EGRID', egrid);
  }
  else {
    url.searchParams.append('IDENTDN', identdn);
    url.searchParams.append('NUMBER', number);
  }
  url.searchParams.append('_dc', new Date().getTime());
  if (language) {
    url.searchParams.append('LANG', language);
  }
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout * 1000);
    fetch(url.toString(), {signal: controller.signal})
      .then((response) => {
        clearTimeout(timer);
        if (response.ok) {
          resolve(response.arrayBuffer());
        }
        else {
          reject(new Error(response.text()));
        }
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
  for (let i = 0; i < concernedThemes.length; i++) {
    if (concernedThemes[i].Code === theme.Code) {
      result = concernedThemes[i];
      break;
    }
  }
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
