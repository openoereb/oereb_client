export function searchTerm(searchUrl, value, limit, prefix) {
    const url = new URL(searchUrl);
    url.searchParams.append('query', prefix ? prefix + ' ' + value : value);
    url.searchParams.append('limit', limit);
    url.searchParams.append('_dc', new Date().getTime());
    let cancel;
    return {
        promise: new Promise((resolve, reject) => {
            fetch(url)
            .then((response) => {
                resolve(response.json())
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