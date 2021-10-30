import bcrypt from 'bcrypt';
// more info about bcrypt: https://www.youtube.com/watch?v=ZwKrMKzd5J8

export default hashPassword = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

export const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
