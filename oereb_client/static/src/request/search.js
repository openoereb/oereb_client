export const searchTerm = function (searchUrl, term, language) {
  const url = new URL(searchUrl);
  url.searchParams.append("term", term);
  url.searchParams.append("lang", language);
  let cancel;
  const result = {
    promise: new Promise((resolve, reject) => {
      fetch(url.toString())
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
      cancel = function () {
        reject(new Error("Request canceled"));
      };
    }),
    cancel
  };
  return result;
};
