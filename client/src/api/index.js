import axios from 'axios';

const API = axios.create({ baseURL: 'https://api-mobile7076.herokuapp.com/api/v1' });

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
export const createBrand = (newBrand) => API.post('/brands', newBrand);
export const updateBrand = (identity, updatedBrand) => API.patch(`/brands/${identity}`, updatedBrand);
export const deleteBrand = (identity) => API.delete(`/brands/${identity}`);

// ----------------------------Discount-----------------------------
export const getAllDiscount = () => API.get('/discounts');
export const getOneDiscount = (identity) => API.get(`/discounts/${identity}`);
export const createDiscount = (newDiscount) => API.post('/discounts', newDiscount);
export const updateDiscount = (identity, updatedDiscount) => API.patch(`/discounts/${identity}`, updatedDiscount);
export const deleteDiscount = (identity) => API.delete(`/discounts/${identity}`);
