import fs from 'fs';
import path from 'path';

/**
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
const COLOR_DIM = '\x1b[2m';
const COLOR_INFO = '\x1b[36m';
const COLOR_WARN = '\x1b[33m';
const COLOR_ERROR = '\x1b[31m';
const COLOR_DEBUG = '\x1b[35m';

const LOG_DIR_PATH = path.join(process.cwd(), 'public', 'logs');
if (!fs.existsSync(LOG_DIR_PATH)) { fs.mkdirSync(LOG_DIR_PATH); }

class LogUtils {
  static saveLog = (type, time, tag, message, object) => {
    const date = time.substr(0, 10);
    const dirPath = path.join(LOG_DIR_PATH, date);
    if (!fs.existsSync(dirPath)) { fs.mkdirSync(dirPath); }

    // append log to file
    fs.appendFileSync(path.join(dirPath, `${type}_${tag}.log`), `\n${time} ${message}`);
    // write detail object to file
    if (object) { fs.writeFileSync(path.join(dirPath, `${type}_${date}.detail.json`), '\n' + JSON.stringify(object)) }
  };

  static log = (type, tag, message, object = null) => {
    const time = new Date().toISOString();

    let logMethod = console[type];
    let logColor = COLOR_RESET;

    if (type === 'info') { logColor = COLOR_INFO; }
    else if (type === 'warn') { logColor = COLOR_WARN; }
    else if (type === 'error') { logColor = COLOR_ERROR; }
    else if (type === 'debug') { logColor = COLOR_DEBUG; }

    const logMessage = `[${COLOR_DIM + time + COLOR_RESET}] ${logColor}[${type}]${COLOR_RESET} [${tag}] ${message}`;

    if (object) { logMethod(logMessage, object); }
    else { logMethod(logMessage); }

    this.saveLog(type, time, tag, message, object);
  };

  static info(tag, message, object = null) {
    this.log('info', tag, message, object);
  }
  static warn(tag, message, object = null) {
    this.log('warn', tag, message, object);
  }
  static error(tag, message, object = null) {
    this.log('error', tag, message, object);
  }
  static debug(tag, message, object = null) {
    this.log('debug', tag, message, object);
  }
}

export default LogUtils;
