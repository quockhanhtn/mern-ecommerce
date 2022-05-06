import mongoose from 'mongoose';
import UserBehavior from '../models/user-behavior.model.js';

const BEHAVIOR = {
  VIEW_TIME: 'viewTime',
  VIEW_COUNT: 'viewCount',
  CLICK_COUNT: 'clickCount',
  HOVER_COUNT: 'hoverCount',
  IN_CART_COUNT: 'inCartCount',
  BOUGHT_COUNT: 'bought'
};

export default {
  handleUserBehavior,
  handleUpdateBoughtCount,
  getDataWithCalculateScore
};

const getExistData = async (userId, ip, productId) => {
  let filter = {};
  if (userId && mongoose.Types.ObjectId.isValid(userId)) {
    filter = { userIdentity: userId, productId };
  } else {
    filter = { ipAddress: ip, productId };
  }
  return UserBehavior.findOne(filter);
}

const weights = (key) => {
  switch (key) {
    case BEHAVIOR.HOVER_COUNT:
    case BEHAVIOR.VIEW_TIME:
      return 1;
    case BEHAVIOR.VIEW_COUNT:
    case BEHAVIOR.CLICK_COUNT:
      return 10;
    case BEHAVIOR.IN_CART_COUNT:
      return 500;
    case BEHAVIOR.BOUGHT_COUNT:
      return 1000;
    default:
      return 0;
  }
};

const calculateScore = (behavior) => {
  return Object.values(BEHAVIOR).reduce((acc, prop) => {
    if (behavior?.[prop] > 0) {
      acc += weights(prop) * behavior[prop];
    }
    return acc;
  }, 0);
};

const mergeData = (prevData, newData) => {
  const mergedData = { ...prevData };
  Object.keys(newData).forEach(key => {
    if (newData[key] !== null) {
      if (key === BEHAVIOR.IN_CART_COUNT) {
        mergedData[key] = newData[key];
      } else {
        const prevData = mergedData[key] || 0;
        mergedData[key] = prevData + newData[key];
      }
    }
  });
  return mergedData;
};

async function handleUserBehavior(userId, ip, trackingData) {
  if (!trackingData) { return; }
  const data = Object.entries(trackingData);

  for (let i = 0; i < data.length; i++) {
    const [productId, behavior] = data[i];
    const userBehavior = await getExistData(userId, ip, productId);

    if (userBehavior) {
      userBehavior.behavior = mergeData(userBehavior.behavior, behavior);
      await userBehavior.save();
    } else {
      const newUserBehavior = new UserBehavior({
        _id: new mongoose.Types.ObjectId(),
        userIdentity: userId,
        ipAddress: ip,
        productId,
        behavior
      });
      await newUserBehavior.save();
    }
  }
}

async function handleUpdateBoughtCount(userId, ip, orderItems) {
  const boughtData = Object.entries(
    orderItems.reduce((acc, { product, quantity }) => {
      if (!acc[product]) {
        acc[product] = 0;
      }
      acc[product] += quantity;
      return acc;
    }, {})
  );

  for (let i = 0; i < boughtData.length; i++) {
    const [productId, qty] = boughtData[i];
    const userBehavior = await getExistData(userId, ip, productId);

    if (userBehavior) {
      if (userBehavior?.behavior?.[BEHAVIOR.BOUGHT_COUNT]) {
        userBehavior.behavior[BEHAVIOR.BOUGHT_COUNT] += qty;
      } else {
        if (userBehavior.behavior) {
          userBehavior.behavior[BEHAVIOR.BOUGHT_COUNT] = qty;
        } else {
          userBehavior.behavior = { [BEHAVIOR.BOUGHT_COUNT]: qty };
        }
      }
      await userBehavior.save();
    } else {
      const newUserBehavior = new UserBehavior({
        _id: new mongoose.Types.ObjectId(),
        userIdentity: userId,
        ipAddress: ip,
        productId,
        behavior: {
          [BEHAVIOR.BOUGHT_COUNT]: qty
        }
      });
      await newUserBehavior.save();
    }
  }
}

async function getDataWithCalculateScore() {
  let result = [];
  const ipScoreMap = {};

  const unKnownUsers = await UserBehavior.find({ userIdentity: { $in: [null, ''] } });
  for (let i = 0; i < unKnownUsers.length; i++) {
    const { productId, ipAddress, behavior } = unKnownUsers[i];
    if (!ipScoreMap[ipAddress]) {
      ipScoreMap[ipAddress] = {};
    }
    if (!ipScoreMap[ipAddress][productId]) {
      ipScoreMap[ipAddress][productId] = { score: 0 };
    }
    const score = calculateScore(behavior);

    ipScoreMap[ipAddress][productId].score += score;
    result.push({ productId, userData: ipAddress, score });
  }

  const knownUsers = await UserBehavior.find({ userIdentity: { $nin: [null, ''] } });
  for (let i = 0; i < knownUsers.length; i++) {
    const { userIdentity, productId, behavior, ipAddress } = knownUsers[i];
    let score = calculateScore(behavior);
    if (ipScoreMap?.[ipAddress]?.[productId]?.score) {
      score += ipScoreMap[ipAddress][productId].score;
    }
    result.push({ productId, userData: userIdentity, score });
  }

  return result;
}
