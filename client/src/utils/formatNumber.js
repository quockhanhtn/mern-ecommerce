import { replace } from 'lodash';
import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number, language = 'vi') {
  const format = language === 'vi' ? '0,0' : '0,0[.]00';
  const price = language === 'vi' ? number : parseFloat(number) / 23000;
  if (language === 'en') {
    return `$ ${numeral(price).format(format)}`;
  }
  return `${numeral(price).format(format)} đ`.replace(/,+/g, '.');
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
