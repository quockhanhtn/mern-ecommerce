import axios from 'axios';

const fptBaseUrl = 'https://recom.fpt.vn/api/v0.1/recommendation/api';
const fptKey = process.env.REACT_APP_FPT_API_KEY || '';
const fptId = process.env.REACT_APP_FPT_API_ID || '';

export const getRecommendation = (input) => {
  const url = `${fptBaseUrl}/result/getResult/${fptId}?input=${input}&key=${fptKey}`;
  return axios.get(url);
};
