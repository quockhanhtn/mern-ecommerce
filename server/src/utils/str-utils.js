export default {
  splitsAndTrim,
  removeMultiSpace,
  replaceAll,
  removeAccents,
  isUUID,
  isEmailAddress,
  isPhoneNumber 
}

/**
 * Splits string into array by separator and trim each element
 * @param {String} str        - string to split
 * @param {String} delimiter  - separator
 * @returns String[]
 */
function splitsAndTrim(str, delimiter) {
  return str.split(delimiter).map(item => item.trim());
}

/**
 * Remove multiple spaces in string
 * @param {String} str - string to remove space
 * @returns String without multiple space
 */
function removeMultiSpace(str) {
  return str.replace(/\s+/g, ' ');
}

/**
 * Escape RegExp
 * @param {*} str - string to escape
 * @returns String escaped
 */
function escapeRegExp(str) {
  return str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * Replaces all text in a string, using a regular expression or search string.
 * @param {*} str - string to replace
 * @param {*} find - string to find
 * @param {*} replace - replace string
 * @returns String replaced
 */
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

/**
 * Remove accents in String
 * @see https://www.tunglt.com/2018/11/bo-dau-tieng-viet-javascript-es6/
 * @param {String} str - string to remove accents
 * @returns String without accents
 */
function removeAccents(str) {
  return str.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

/**
 * Validate string is uuid
 * @param {String} str - string to check
 * @returns true if string is Uuid else false
 */
function isUUID(str) {
  return /^[0-9a-fA-F]{24}$/.test(str);
}

function isEmailAddress(str) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
}
function isPhoneNumber(str) {
  return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(str);
}
