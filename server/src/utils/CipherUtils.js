import bcrypt from 'bcrypt';
// more info about bcrypt: https://www.youtube.com/watch?v=ZwKrMKzd5J8

class CipherUtils {
  static hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

export default CipherUtils;
