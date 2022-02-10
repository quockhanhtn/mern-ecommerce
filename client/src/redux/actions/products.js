import * as actionTypes from '../../constants/actionTypes';
import * as api from '../../api';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const getAllProducts =
  (search = '', brand = '', category = '', page = 1, limit = 12) =>
  async (dispatch) => {
    try {
      dispatch({ type: actionTypes.START_LOADING });

      const { data } = await api.getAllProduct('', search, brand, category, page, limit);
      if (isDev) console.log('[actions][products][getAll] result', data);

      dispatch({ type: actionTypes.PRODUCT.GET_ALL, payload: data });
      dispatch({ type: actionTypes.END_LOADING });
    } catch (e) {
      console.error('[actions][products][getAll] error', e);
      dispatch({ type: actionTypes.HAS_ERROR });
    }
  };

export const getFullAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    const { data } = await api.getFullAllProduct();
    if (isDev) console.log('[actions][products][getFullAll] result', data);

    dispatch({
      type: actionTypes.PRODUCT.GET_FULL_ALL,
      payload: data.data
    });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('[actions][products][getFullAll] error', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    if (isDev) console.log('[actions][products][getProductById] id', id);
    const { data } = await api.getOneProduct(id);
    if (isDev) console.log('[actions][products][getOne] result', data);

    dispatch({ type: actionTypes.PRODUCT.GET_ONE, payload: data.data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/products/getProductById', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const createProduct = (newProduct) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    if (isDev) console.log('[actions][products][create] dataInput', newProduct);
    const { data } = await api.createProduct(newProduct);
    if (isDev) console.log('[actions][products][create] result', data);

    dispatch({ type: actionTypes.PRODUCT.CREATE, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('[actions][products][create] error', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const updateProduct = (id, updateProduct) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    if (isDev) console.log('[actions][products][update] dataInput', updateProduct);
    const { data } = await api.updateProduct(id, updateProduct);
    if (isDev) console.log('[actions][products][update] result', data);

    dispatch({ type: actionTypes.PRODUCT.UPDATE, payload: data.data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/products/updateProduct', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    await api.deleteProduct(id);
    dispatch({ type: actionTypes.PRODUCT.DELETE, payload: id });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/products/deleteProduct', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const createProductVariant = (id, productVariant) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    if (isDev) console.log('[actions][productVariants][create] dataInput', productVariant);

    const { data } = await api.createProductVariant(id, productVariant);

    if (isDev) console.log('[actions][productVariants][create] result', data);

    dispatch({ type: actionTypes.PRODUCT.CREATE_VARIANT, payload: data.data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/products/createProductVariant', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const updateProductVariant = (id, sku, productVariant) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.updateProductVariant(id, sku, productVariant);
    dispatch({ type: actionTypes.PRODUCT.CREATE_VARIANT, payload: data.data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/products/updateProductVariant', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const deleteProductVariant = (productId, sku) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    await api.deleteProductVariant(productId, sku);
    dispatch({ type: actionTypes.PRODUCT.DELETE_VARIANT, payload: sku });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/products/deleteProductVariant', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};
