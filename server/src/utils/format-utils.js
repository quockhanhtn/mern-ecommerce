export default {
  formatImageUrl
}


export function formatImageUrl(obj, imageKey, req) {
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