export const getType = (object) => Object.prototype.toString.call(object).slice(8, -1);
export const isFunction = (object) => getType(object) === 'Function';
export const isString = (object) => getType(object) === 'String';
