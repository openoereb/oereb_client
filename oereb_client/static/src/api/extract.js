export const queryExtractById = function (applicationUrl, egrid, language) {
  const url = new URL(applicationUrl + 'extract/reduced/json/geometry/' + egrid);
  url.searchParams.append('_dc', new Date().getTime());
  if (language) {
    url.searchParams.append('LANG', language);
  }
  return fetch(url).then((response) => response.json());
};

export const queryStaticExtractById = function (applicationUrl, egrid, language) {
  const url = new URL(applicationUrl + 'extract/reduced/pdf/' + egrid);
  url.searchParams.append('_dc', new Date().getTime());
  if (language) {
    url.searchParams.append('LANG', language);
  }
  return fetch(url).then((response) => response.arrayBuffer());
};

export const sanitizeTopicCode = function (code) {
  return code.replace('.', '').replace('-', '').replace('_', '');
};

export const groupRestrictionsByTopic = function (restrictions) {
  const restrictionsByTopic = {};
  restrictions.forEach((restriction) => {
    const code = sanitizeTopicCode(restriction.Theme.Code);
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
