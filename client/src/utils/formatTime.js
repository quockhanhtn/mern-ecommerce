import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, formatStr = 'dd MMMM yyyy') {
  return format(new Date(date), formatStr);
}

export function fDateTime(date, formatStr = 'dd MMMM yyyy HH:mm') {
  return format(new Date(date), formatStr);
}

export function fDateTimeSuffix(date, formatStr = 'dd/MM/yyyy hh:mm p') {
  return format(new Date(date), formatStr);
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}
