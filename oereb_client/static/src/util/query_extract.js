export function queryExtractById(applicationUrl, egrid) {
    const url = new URL(applicationUrl + 'extract/reduced/json/geometry/' + egrid);
    url.searchParams.append('_dc', new Date().getTime());
    return fetch(url).then(response => response.json());
}