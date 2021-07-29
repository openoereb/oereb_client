export function searchTerm(config, value) {
    const url = new URL(config.url);
    url.searchParams.append('query', config.prefix ? config.prefix + ' ' + value : value);
    url.searchParams.append('limit', config.limit);
    url.searchParams.append('_dc', new Date().getTime());
    let cancel;
    return {
        promise: new Promise((resolve, reject) => {
            fetch(url)
            .then(response => response.json())
            .then((data) => {
                resolve({
                    config: config,
                    data: data.features.map((feature) => {
                        return feature.properties.label;
                    })
                })
            })
            .catch((error) => {
                reject(error);
            });
            cancel = function() {
                reject('Request canceled');
            }
        }),
        cancel: cancel
    };
}

export function sanitzeSearchResult(originalResult, config) {
    let result = originalResult;
    if (config.filters instanceof Array) {
        config.filters.forEach((filter) => {
            if (filter.regex instanceof RegExp) {
                result = result.replace(filter.regex, filter.value);
            }
        });
    }
    return result;
}
