export const searchTerm = function (config, value) {
  const url = new URL(config.url);
  url.searchParams.append('query', config.prefix ? config.prefix + ' ' + value : value);
  url.searchParams.append('limit', config.limit);
  url.searchParams.append('_dc', new Date().getTime());
  let cancel;
  const result = {
    promise: new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          resolve({
            config: config,
            data: data.features.map((feature) => feature.properties.label)
          })
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

export const sanitzeSearchResult = function (originalResult, config) {
  let result = originalResult;
  if (config.filters instanceof Array) {
    config.filters.forEach((filter) => {
      if (filter.regex instanceof RegExp) {
        result = result.replace(filter.regex, filter.value);
      }
    });
  }
  return result;
};
