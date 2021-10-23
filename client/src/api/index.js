import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001/api/v1' });

// Add Header Authorization
API.interceptors.request.use((req) => {
  const authData = JSON.parse(localStorage.getItem('authData'));
  if (authData?.tokenId) {
    req.headers.authorization = `Bearer ${authData.tokenId}`;
  }
  return req;
});

// ----------------------------Category-----------------------------
export const getAllCategory = () => API.get('/categories');

// ----------------------------Brand-----------------------------
export const getAllBrand = () => API.get('/brands');
