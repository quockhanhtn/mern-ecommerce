export const getType = (object) => Object.prototype.toString.call(object).slice(8, -1);
export const isFunction = (object) => getType(object) === 'Function';
export const isString = (object) => getType(object) === 'String';

export const isNotEmptyStr = (str) => {
  if (str === undefined || str === null || !str) {
    return false;
  }

  return isString(str) && str.trim().length > 0;
};
