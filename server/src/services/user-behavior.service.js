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

function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

function isValidRating(n) {
  return (isInt(n) || isFloat(n)) && (n >= 0 && n <= 1);
}

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

async function handleUserBehavior(userIdentifier, trackingData) {
  if (!trackingData) { return; }
  const data = Object.entries(trackingData);

  for (let i = 0; i < data.length; i++) {
    const [productId, behavior] = data[i];
    const userBehavior = await UserBehavior.findOne({ userIdentifier, productId });

    if (userBehavior) {
      userBehavior.behavior = mergeData(userBehavior.behavior, behavior);
      await userBehavior.save();
    } else {
      const newUserBehavior = new UserBehavior({
        _id: new mongoose.Types.ObjectId(),
        userIdentifier,
        productId,
        behavior
      });
      await newUserBehavior.save();
    }
  }
}

async function handleUpdateBoughtCount(userIdentifier, orderItems) {
  const boughtData = Object.entries(
    orderItems.reduce((acc, { productId, quantity }) => {
      if (!acc[productId]) {
        acc[productId] = 0;
      }
      acc[productId] += quantity;
      return acc;
    }, {})
  );

  for (let i = 0; i < boughtData.length; i++) {
    const [productId, qty] = boughtData[i];
    const userBehavior = await UserBehavior.findOne({ userIdentifier, productId });

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
      await UserBehavior.findByIdAndUpdate(userBehavior._id, { $set: { behavior: userBehavior.behavior } });
    } else {
      const newUserBehavior = new UserBehavior({
        _id: new mongoose.Types.ObjectId(),
        userIdentifier,
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
  const userBehaviorData = await UserBehavior.find({ productId: { $ne: 'undefined' } }).sort({ userData: 1 }).lean().exec();
  const groupByLst = userBehaviorData
    .map((item) => ({
      productId: item.productId,
      userData: item.userIdentifier,
      score: calculateScore(item.behavior)
    }))
    .reduce((acc, item) => {
      if (!acc[item.userData]) {
        acc[item.userData] = [];
      }
      acc[item.userData].push(item);

      return acc;
    }, {});

  let result = [];
  Object.keys(groupByLst).forEach((key) => {
    const lst = Array.from(groupByLst[key]);
    const maxScore = Math.max(...lst.map(({ score }) => score));
    result = result.concat(
      lst.reduce((acc, { productId, userData, score }) => {
        const rating = Number.parseFloat(
          (Number.parseFloat(score) / maxScore).toFixed(5)
        );
        if (!Number.isNaN(rating)) {
          acc.push({ productId, userData, rating });
        }
        return acc;
      }, [])
    );
  });

  return result.filter((x) => isValidRating(x.rating));
}
