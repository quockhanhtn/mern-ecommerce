import numeral from 'numeral';

class FormatUtils {
  /**
   * Format the image url
   */
  static imageUrl(obj, imageKey, req) {
    if (obj?.[imageKey]) {
      if (typeof obj[imageKey] === 'string' && obj[imageKey].startsWith('/')) {
        obj[imageKey] = `${req.protocol}://${req.get('host')}` + obj[imageKey];
      } else if (Array.isArray(obj[imageKey]) && obj[imageKey].length > 0) {
        for (let i = 0; i < obj[imageKey].length; i++) {
          const element = obj[imageKey][i];
          if (element.startsWith('/')) {
            obj[imageKey][i] = `${req.protocol}://${req.get('host')}` + element;
          }
        }
      }
    }
    return obj;
  }

  static formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  static formateReadableTimeSpan(dateFrom, dateTo) {
    const diff = dateTo.getTime() - dateFrom.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    let result = '';
    if (days > 0) {
      result += `${days} day${days > 1 ? 's' : ''}`;
    }
    if (hours > 0) {
      result += `${result ? ' ' : ''}${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
      result += `${result ? ' ' : ''}${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    if (seconds > 0) {
      result += `${result ? ' ' : ''}${seconds} second${seconds > 1 ? 's' : ''}`;
    }
    if (result === '') {
      result = '0 second';
    }
    return result;
  }

  static formatCurrency(number, language = 'vi') {
    const format = language === 'vi' ? '0,0' : '0,0[.]00';
    const price = language === 'vi' ? number : parseFloat(number) / 23000;
    if (language === 'en') {
      return `$ ${numeral(price).format(format)}`;
    }
    return `${numeral(price).format(format)} đ`.replace(/,+/g, '.');
  }
}
export default FormatUtils;
