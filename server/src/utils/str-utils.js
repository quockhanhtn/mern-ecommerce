function splitsAndTrim(str, delimiter) {
  return str.split(delimiter).map(item => item.trim());
}

function removeMultiSpace(str) {
  return str.replace(/\s+/g, ' ');
}

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

/**
 * Remove accents in String
 * 
 * Ref: https://www.tunglt.com/2018/11/bo-dau-tieng-viet-javascript-es6/
 * @param {String} str 
 * @returns String without accents
 */
function removeAccents(str) {
  return str.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

// check string is UUID
function isUUID(str) {
  return /^[0-9a-fA-F]{24}$/.test(str);
}


export default {
  splitsAndTrim,
  removeMultiSpace,
  replaceAll,
  removeAccents,
  isUUID
}