import { replace } from 'lodash';
import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number, language = 'vi') {
  const suffix = language === 'vi' ? 'đ' : '$';
  const price = language === 'vi' ? number : parseFloat(number) / 23000;
  const format = language === 'vi' ? '0,0' : '0,0[.]00';
  return `${numeral(price).format(format)} ${suffix}`;
}

export function fPercent(number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}
