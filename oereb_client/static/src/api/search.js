export const searchTerm = function (applicationUrl, term, language) {
  const url = new URL(applicationUrl + 'search');
  url.searchParams.append('term', term);
  url.searchParams.append('lang', language);
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
