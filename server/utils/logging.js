import fs from 'fs';
import path from 'path';

/**
 *
 * Reset = "\x1b[0m"
 * Bright = "\x1b[1m"
 * Dim = "\x1b[2m"
 * Underscore = "\x1b[4m"
 * Blink = "\x1b[5m"
 * Reverse = "\x1b[7m"
 * Hidden = "\x1b[8m"
 *
 * FgBlack = "\x1b[30m"
 * FgRed = "\x1b[31m"
 * FgGreen = "\x1b[32m"
 * FgYellow = "\x1b[33m"
 * FgBlue = "\x1b[34m"
 * FgMagenta = "\x1b[35m"
 * FgCyan = "\x1b[36m"
 * FgWhite = "\x1b[37m"
 *
 * BgBlack = "\x1b[40m"
 * BgRed = "\x1b[41m"
 * BgGreen = "\x1b[42m"
 * BgYellow = "\x1b[43m"
 * BgBlue = "\x1b[44m"
 * BgMagenta = "\x1b[45m"
 * BgCyan = "\x1b[46m"
 * BgWhite = "\x1b[47m"
 */
const COLOR_RESET = '\x1b[0m';
const COLOR_INFO = '\x1b[32m';
const COLOR_WARN = '\x1b[33m';
const COLOR_ERROR = '\x1b[31m';
const COLOR_DEBUG = '\x1b[37m';

const getTimeStamp = () => new Date().toISOString();

const saveLog = (type, time, tag, message, object) => {
  const date = time.substr(0, 10);
  const dirPath = path.join(process.cwd(), 'public', 'logs', date);
  if (!fs.existsSync(dirPath)) { fs.mkdirSync(dirPath); }

  fs.appendFileSync(path.join(dirPath, `${type}_${tag}.log`), `\n${time} ${message}`);
  if (object) {
    fs.writeFileSync(path.join(dirPath, `${type}_${date}.detail.json`), '\n' + JSON.stringify(object))
  }
}

const info = (tag, message, object = null) => {
  const time = getTimeStamp();
  if (object) {
    console.info(`[${time}] ${COLOR_INFO}[INFO]${COLOR_RESET} [${tag}] ${message}`, object);
  } else {
    console.info(`[${time}] ${COLOR_INFO}[INFO]${COLOR_RESET} [${tag}] ${message}`);
  }
  saveLog('info', time, tag, message, object);
};

const warn = (tag, message, object = null) => {
  const time = getTimeStamp();
  if (object) {
    console.warn(`[${time}] ${COLOR_WARN}[WARN]${COLOR_RESET} [${tag}] ${message}`, object);
  } else {
    console.warn(`[${time}] ${COLOR_WARN}[WARN]${COLOR_RESET} [${tag}] ${message}`);
  }
  saveLog('warn', time, tag, message, object);
};

const error = (tag, message, object = null) => {
  const time = getTimeStamp();
  if (object) {
    console.error(`[${time}] ${COLOR_ERROR}[ERROR]${COLOR_RESET} [${tag}] ${message}`, object);
  } else {
    console.error(`[${time}] ${COLOR_ERROR}[ERROR]${COLOR_RESET} [${tag}] ${message}`);
  }
  saveLog('error', time, tag, message, object);
};

const debug = (tag, message, object = null) => {
  const time = getTimeStamp();
  if (object) {
    console.debug(`[${time}] ${COLOR_DEBUG}[DEBUG]${COLOR_RESET} [${tag}] ${message}`, object);
  } else {
    console.debug(`[${time}] ${COLOR_DEBUG}[DEBUG]${COLOR_RESET} [${tag}] ${message}`);
  }
  saveLog('debug', time, tag, message, object);
};

export default { info, warn, error, debug };
