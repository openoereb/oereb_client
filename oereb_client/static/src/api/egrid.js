export const queryEgridByCoord = function (serviceUrl, coord) {
  const url = new URL(serviceUrl + 'getegrid/json/');
  url.searchParams.append('EN', '' + coord[0] + ',' + coord[1]);
  url.searchParams.append('_dc', new Date().getTime());
  return fetch(url).then((response) => response.json());
};
