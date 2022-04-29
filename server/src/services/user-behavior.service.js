import mongoose from 'mongoose';
import UserBehavior from '../models/user-behavior.model.js';

const BEHAVIOR = {
  VIEW_TIME: 'viewTime',
  VIEW_COUNT: 'viewCount',
  CLICK_COUNT: 'clickCount',
  HOVER_COUNT: 'hoverCount',
  IN_CART: 'inCart',
  BOUGHT: 'bought'
};

export default {
  handleUserBehavior
};

const mergeData = (prevData, newData) => {
  const mergedData = { ...prevData };
  Object.keys(newData).forEach(key => {
    if (newData[key] !== null) {
      if (key === BEHAVIOR.IN_CART) {
        mergedData[key] = newData[key];
      } else {
        const prevData = mergedData[key] || 0;
        mergedData[key] = prevData + newData[key];
      }
    }
  });
  return mergedData;
};

async function handleUserBehavior(userIdentity, trackingData) {
  if (!trackingData) { return; }
  for (let i = 0; i < Object.entries(trackingData).length; i++) {
    const [productId, behavior] = Object.entries(trackingData)[i];
    const userBehavior = await UserBehavior.findOne({ userIdentity, productId });

    if (userBehavior) {
      userBehavior.behavior = mergeData(userBehavior.behavior, behavior);
      await userBehavior.save();
    } else {
      const newUserBehavior = new UserBehavior({
        _id: new mongoose.Types.ObjectId(),
        userIdentity,
        productId,
        behavior
      });
      await newUserBehavior.save();
    }
  }
}

async function handleUpdateBought(userIdentity, productId) {
  const userBehavior = await UserBehavior.findOne({ userIdentity, productId });
  if (userBehavior) {
    userBehavior.behavior[BEHAVIOR.BOUGHT] = 1;
    return userBehavior.save();
  }

  const newUserBehavior = new UserBehavior({
    _id: new mongoose.Types.ObjectId(),
    userIdentity,
    productId,
    behavior: {
      [BEHAVIOR.BOUGHT]: 1
    }
  });
  return newUserBehavior.save();
}
