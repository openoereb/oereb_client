export const queryEgridByCoord = function(applicationUrl, coord) {
    const url = new URL(applicationUrl + 'getegrid/json/');
    url.searchParams.append('XY', '' + coord[0] + ',' + coord[1]);
    url.searchParams.append('_dc', new Date().getTime());
    return fetch(url).then((response) => response.json());
};
