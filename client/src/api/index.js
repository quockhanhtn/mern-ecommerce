import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v2';
const API = axios.create({ baseURL });

// Add Header Authorization
API.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    req.headers.authorization = `Bearer ${accessToken}`;
  }
  return req;
});

export const apiInstance = API;

// ----------------------------Auth------------------------------------

// if user exist then login otherwise signup
export const googleOAuth = (googleCredential) => API.post('/auth/google', { googleCredential });

export const register = (data) => API.post('/auth/login', data);
export const login = (username, password) => API.post('/auth/login', { username, password });
export const logout = (refreshToken) => API.post('/auth/logout', { refreshToken });

// ----------------------------Account----------------------------------
export const getInfo = () => API.get('/account');
export const updateInfo = (data) => API.patch('/account', data);
export const changePassword = (data) => API.patch('/account/change-password', data);

export const getAddresses = () => API.get('/account/addresses');
export const addAddress = (data) => API.post('/account/addresses', data);
export const updateAddress = (id, data) => API.patch(`/account/addresses/${id}`, data);
export const deleteAddress = (id) => API.delete(`/account/addresses/${id}`);

// ----------------------------Category--------------------------------
export const getAllCategory = (fields) => (fields ? API.get(`/categories?fields=${fields}`) : API.get('/categories'));
export const getOneCategory = (identity) => API.get(`/categories/${identity}`);
export const createCategory = (newCategory) => API.post('/categories', newCategory);
export const updateCategory = (identity, updatedCategory) => API.patch(`/categories/${identity}`, updatedCategory);
export const deleteCategory = (identity) => API.delete(`/categories/${identity}`);

// ----------------------------Brand-----------------------------------
export const getAllBrand = (fields) => (fields ? API.get(`/brands?fields=${fields}`) : API.get('/brands'));
export const getOneBrand = (identity) => API.get(`/brands/${identity}`);
export const createBrand = (newBrand) => API.post('/brands', newBrand);
export const updateBrand = (identity, updatedBrand) => API.patch(`/brands/${identity}`, updatedBrand);
export const deleteBrand = (identity) => API.delete(`/brands/${identity}`);

// ----------------------------Discount--------------------------------
export const getAllDiscount = (fields) => (fields ? API.get(`/discounts?fields=${fields}`) : API.get('/discounts'));
export const getOneDiscount = (identity) => API.get(`/discounts/${identity}`);
export const createDiscount = (newDiscount) => API.post('/discounts', newDiscount);
export const updateDiscount = (identity, updatedDiscount) => API.patch(`/discounts/${identity}`, updatedDiscount);
export const deleteDiscount = (identity) => API.delete(`/discounts/${identity}`);

// ----------------------------Product---------------------------------
export const getAllProduct = (fields, search, brand, category, page, limit) =>
  API.get(`/products?fields=${fields}&search=${search}&b=${brand}&c=${category}&page=${page}&limit=${limit}`);
export const getSearchSuggest = (keyword) => API.get(`/products/search/suggest?keyword==${keyword}`);
export const getFullAllProduct = () => API.get('/products/all');
export const getRelatedProduct = (listId) =>
  API.post('/products/get-by-ids', { list: listId, fields: '_id name slug category brand views rate variants' });
export const getOneProduct = (identity) => API.get(`/products/${identity}`);
export const createProduct = (newProduct) => API.post('/products', newProduct);
export const updateProduct = (identity, updatedProduct) => API.patch(`/products/${identity}`, updatedProduct);
export const deleteProduct = (identity) => API.delete(`/products/${identity}`);

// ----------------------------Variant--------------------------------
export const createProductVariant = (identity, newProductVariant) =>
  API.post(`/products/${identity}/variants`, newProductVariant);
export const updateProductVariant = (identity, sku, updatedProduct) =>
  API.patch(`/products/${identity}/variants/${sku}`, updatedProduct);
export const deleteProductVariant = (identity, sku) => API.delete(`/products/${identity}/variants/${sku}`);

// ----------------------------User (staff) --------------------------
export const getAllStaffs = () => API.get('/users/staff');
export const getStaff = (identity) => API.get(`/users/staff/${identity}`);
export const createStaff = (newUser) => API.post('/users/staff', newUser);
export const updateStaff = (identity, updatedUser) => API.patch(`/users/staff/${identity}`, updatedUser);
export const deleteStaff = (identity) => API.delete(`/users/staff/${identity}`);

// ----------------------------User (customer) -----------------------
export const getAllCustomers = () => API.get('/users/customer');
export const getOneUser = (identity) => API.get(`/users/customer/${identity}`);
export const createUser = (newUser) => API.post('/users/customer', newUser);
export const updateUser = (identity, updatedUser) => API.patch(`/users/customer/${identity}`, updatedUser);
export const deleteUser = (identity) => API.delete(`/users/customer/${identity}`);

// ----------------------------Payment--------------------------------
export const redirectVnPay = (paymentInfo) => API.post(`/payment/vn_pay`, paymentInfo);
export const paymentCallback = () => API.get(`/cart/payment`);

// ----------------------------Order----------------------------------
export const getListOrders = (params = {}) => API.get('/orders', { params });
export const createOrder = (newOrder) => API.post('/orders', newOrder);
export const getOrder = (id) => API.get(`/orders/${id}`);
export const rePayOrder = (id) => API.get(`/orders/re-pay/${id}`);
export const cancelOrder = (id, params) => API.patch(`/orders/cancel/${id}`, { params });

// ----------------------------Order manager---------------------------
export const orderManager = {
  getAll: (search, orderStatus, paymentStatus, page, limit) =>
    API.get(
      `/orders/manager/?search=${search}&status=${orderStatus}&paymentStatus=${paymentStatus}&page=${page}&limit=${limit}`
    ),
  create: (newOrder) => API.post('/orders/manager', newOrder),
  update: (id, updatedOrder) => API.patch(`/orders/manager/${id}`, updatedOrder)
};
// ----------------------------Comment --------------------------------
export const getAllComment = (product) => API.get(`/comments/${product}`);
export const createComment = (newComment) => API.post(`/comments`, newComment);

// ----------------------------Cart------------------------------------
export const getCartItems = () => API.post(`/cart`);
export const addItemToCart = (item) => API.post(`/cart/add`, item);
export const increaseQty = (item) => API.patch(`/cart`, { ...item, delta: 1 });
export const decreaseQty = (item) => API.patch(`/cart`, { ...item, delta: -1 });
export const removeItem = (productInfo) => API.delete(`/cart/delete`, productInfo);
export const cleanCart = () => API.delete(`/cart/clean`);
