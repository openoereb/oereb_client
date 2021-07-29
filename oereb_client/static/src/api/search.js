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
                    title: config.title,
                    data: data
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