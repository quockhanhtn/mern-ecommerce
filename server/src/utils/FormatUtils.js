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
}
export default FormatUtils;
