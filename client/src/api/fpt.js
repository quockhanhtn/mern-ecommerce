import axios from 'axios';

const baseURL = 'https://recom.fpt.vn/api/v0.1/recommendation/api/result/getResult/';
const fptApiIns = axios.create({ baseURL });

const relatedItemId = process.env.REACT_APP_FPT_RELATED_ITEM_ID || '';
const relatedItemKey = process.env.REACT_APP_FPT_RELATED_ITEM_KEY || '';

const userBehaviorId = process.env.REACT_APP_FPT_USER_BEHAVIOR_ID || '';
const userBehaviorKey = process.env.REACT_APP_FPT_USER_BEHAVIOR_KEY || '';

export const getRelatedItems = (input) => {
  const params = { input, key: relatedItemKey };
  return fptApiIns.get(relatedItemId, { params });
};

export const getUserBasedRecommendation = (input) => {
  const params = { input, key: userBehaviorKey };
  return fptApiIns.get(userBehaviorId, { params });
};
