export const queryEgridByCoord = function (serviceUrl, coord) {
  const url = new URL(serviceUrl + "getegrid/json/");
  url.searchParams.append("EN", "" + coord[0] + "," + coord[1]);
  url.searchParams.append("_dc", new Date().getTime());
  return new Promise((resolve, reject) => {
    fetch(url.toString()).then((response) => {
      if (response.status === 204 || response.status >= 400) {
        reject(response);
      }
      else {
        resolve(response.json());
      }
    });
  });
};
