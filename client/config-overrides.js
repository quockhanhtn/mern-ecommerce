/* eslint-disable prettier/prettier, react-hooks/rules-of-hooks */
const { override, useBabelRc } = require('customize-cra');

module.exports = override(
  useBabelRc()
);
