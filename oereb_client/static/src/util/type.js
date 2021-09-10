export const isObject = function(value) {
    return value instanceof Object;
};

export const isArray = function(value) {
    return value instanceof Array;
};

export const isString = function(value) {
    return typeof value === 'string' || value instanceof String;
};
