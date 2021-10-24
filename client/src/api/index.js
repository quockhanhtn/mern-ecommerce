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
export const getOneCategory = (identity) => API.get(`/categories/${identity}`);
export const createCategory = (newCategory) => API.post('/categories', newCategory);
export const updateCategory = (identity, updatedCategory) => API.patch(`/categories/${identity}`, updatedCategory);
export const deleteCategory = (identity) => API.delete(`/categories/${identity}`);

// ----------------------------Brand-----------------------------
export const getAllBrand = () => API.get('/brands');
export const getOneBrand = (identity) => API.get(`/brands/${identity}`);
export const createBrand = (newCategory) => API.post('/brands', newCategory);
export const updateBrand = (identity, updatedBrand) => API.patch(`/brands/${identity}`, updatedBrand);
export const deleteBrand = (identity) => API.delete(`/brands/${identity}`);