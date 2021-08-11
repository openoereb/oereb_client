export function queryExtractById(applicationUrl, egrid) {
    const url = new URL(applicationUrl + 'extract/reduced/json/geometry/' + egrid);
    url.searchParams.append('_dc', new Date().getTime());
    return fetch(url).then(response => response.json());
}

export function sanitizeTopicCode(code) {
    return code.replace('.', '').replace('-', '').replace('_', '');
}

export function groupRestrictionsByTopic(retstrictions) {
    const restrictionsByTopic = {};
    retstrictions.forEach((restriction) => {
        const code = sanitizeTopicCode(restriction.Theme.Code);
        if (!restrictionsByTopic.hasOwnProperty(code)) {
            restrictionsByTopic[code] = [];
        }
        restrictionsByTopic[code].push(restriction);
    });
    return restrictionsByTopic;
}
