export const searchTerm = function (applicationUrl, value) {
  const url = new URL(applicationUrl + 'search');
  url.searchParams.append('term', value);
  let cancel;
  const result = {
    promise: new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error);
        });
      cancel = function () {
        reject(new Error('Request canceled'));
      }
    }),
    cancel: cancel
  };
  return result;
};
