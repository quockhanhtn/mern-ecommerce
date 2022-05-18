import mongoose from 'mongoose';

class ValidUtils {
  static isUuid(uuid) {
    return mongoose.Types.ObjectId.isValid(uuid);
  }
}

export default ValidUtils;