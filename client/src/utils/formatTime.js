import { format, formatDistanceToNow } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';

// ----------------------------------------------------------------------

const locales = { vi, en: enUS };

function formatLocale(date, formatStr, locale) {
  return format(new Date(date), formatStr, { locale });
}

export function fDate(date, lang = 'vi') {
  const dateObj = new Date(date);
  if (dateObj.getFullYear() > 200000) {
    return lang === 'vi' ? 'Vô hạn' : 'Infinity';
  }
  return formatLocale(date, 'dd MMMM yyyy', locales[lang]);
}

export function fDateTime(date, lang = 'vi') {
  return formatLocale(date, 'dd MMMM yyyy HH:mm', locales[lang]);
}

export function fDateTimeSuffix(date, lang = 'vi') {
  return formatLocale(date, 'dd/MM/yyyy hh:mm p', locales[lang]);
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
