import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';
import { getRelatedItems, getUserBasedRecommendation } from '../../api/fpt';

const initialState = {
  isLoading: true,
  dashboard: {
    list: [],
    pagination: {},
    categoryFilter: [],
    brandFilter: [],
    error: null,
    isLoading: false
  },

  error: null,
  item: null,
  list: [],
  listFull: [],
  pagination: {},
  related: {
    isLoading: false,
    error: null,
    result: [],
    map: {}
  },

  productForYou: {
    isLoading: false,
    error: null,
    list: []
  }
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // #region dashboard
    dashboardStartLoading(state) {
      state.dashboard.isLoading = true;
    },
    dashboardHasError(state, action) {
      state.dashboard.isLoading = false;
      state.dashboard.error = action.payload;
    },
    dashboardGetSuccess(state, action) {
      state.dashboard.isLoading = false;
      state.dashboard.error = null;
      state.dashboard.list = action.payload.data;
      state.dashboard.pagination = action.payload.pagination;
      state.dashboard.categoryFilter = action.payload.categoryFilter;
      state.dashboard.brandFilter = action.payload.brandFilter;
    },
    // #endregion dashboard
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getAllSuccess(state, action) {
      state.list = action.payload.data;
      state.isLoading = false;
      state.error = null;
      state.pagination = action.payload.pagination;
    },
    getAllFullSuccess(state, action) {
      state.listFull = action.payload.data;
      state.isLoading = false;
      state.error = null;
    },
    getOneSuccess(state, action) {
      state.item = action.payload.data;
      state.isLoading = false;
      state.error = null;
    },
    createSuccess(state, action) {
      state.list.push(action.payload.data);
      state.isLoading = false;
      state.error = null;
    },
    updateSuccess(state, action) {
      return {
        ...state,
        list: state.list.map((p) => (p._id === action.payload._id ? action.payload : p)),
        isLoading: false,
        error: null
      };
    },
    toggleHideSuccess(state, action) {
      state.dashboard.list = state.dashboard.list.map((p) =>
        p._id === action.payload._id ? { ...p, isHide: action.payload.isHide } : p
      );
    },
    deleteSuccess(state, action) {
      return {
        ...state,
        list: state.list.filter((p) => p._id !== action.payload._id),
        isLoading: false,
        error: null
      };
    },
    createVariantSuccess(state, action) {
      return { ...state, list: [action.payload.data, ...state.list], error: null };
    },
    updateVariantSuccess(state, action) {
      return {
        ...state,
        list: state.list.map((p) => (p._id === action.payload._id ? action.payload : p)),
        error: null
      };
    },
    deleteVariantSuccess(state, action) {
      return { ...state, list: state.list.variants.filter((cat) => cat.sku !== action.payload), hasError: false };
    },
    // recommendations
    startRelatedLoading(state) {
      state.related.isLoading = true;
    },
    hasRelatedError(state, action) {
      state.related.error = action.payload;
      state.related.isLoading = false;
    },
    getRelatedSuccess(state, action) {
      state.related.isLoading = false;
      state.related.error = null;
      state.related[action.payload._id] = {
        listIds: action.payload.listIds,
        products: action.payload.products
      };
    },
    relatedExists(state) {
      state.related.isLoading = false;
      state.related.error = null;
    },
    // #region Product For You
    forYouStartLoading(state) {
      state.productForYou.isLoading = true;
    },
    forYouHasError(state, action) {
      state.productForYou.isLoading = false;
      state.productForYou.error = action.payload;
    },
    forYouGetSuccess(state, action) {
      state.productForYou.isLoading = false;
      state.productForYou.error = null;
      state.productForYou.list = action.payload.list;
    }
    // #endregion Product For You
  }
});

const { actions, reducer } = productSlice;

export const { getAlls } = actions;
export default reducer;

export const getProductDashboard =
  (search, page, limit, sort, sortBy, category, brand, showHide) => async (dispatch) => {
    try {
      dispatch(actions.dashboardStartLoading());

      const { data } = await api.getAllProduct2({
        search: search || '',
        c: category || '',
        b: brand || '',
        page,
        limit,
        sort,
        sortBy,
        getBrandFilter: '1',
        getCategoryFilter: '1',
        isShowHidden: showHide ? '1' : '0'
      });
      dispatch(actions.dashboardGetSuccess(data));
    } catch (e) {
      dispatch(actions.dashboardHasError(e));
    }
  };

export const getAllProducts = (search, brand, category, page, limit) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());

    const { data } = await api.getAllProduct2({
      search: search || '',
      page,
      limit,
      b: brand || '',
      c: category || ''
    });
    dispatch(actions.getAllSuccess(data));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

export const getFullAllProducts = () => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.getFullAllProduct();
    dispatch(actions.getAllFullSuccess(data));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const fields =
      '_id name slug desc video overSpecs policies detailSpecs origin category brand tags views rate variants quantity warrantyPeriod isHide createdAt updatedAt';
    const { data } = await api.getOneProduct(id, fields);
    dispatch(actions.getOneSuccess(data));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

export const createProduct = (newProduct) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.createProduct(newProduct);
    dispatch(actions.createSuccess(data));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

export const updateProduct = (id, updateProduct) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.updateProduct(id, updateProduct);
    dispatch(actions.updateSuccess(data));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    await api.deleteProduct(id);
    dispatch(actions.deleteSuccess(id));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

export const toggleHideProduct = (id) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.toggleHideProduct(id);
    dispatch(actions.toggleHideSuccess(data.data));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

export const createProductVariant = (id, productVariant) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.createProductVariant(id, productVariant);
    dispatch(actions.createVariantSuccess(data));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

export const updateProductVariant = (id, sku, productVariant) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.updateProductVariant(id, sku, productVariant);
    dispatch(actions.updateVariantSuccess(data));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

export const deleteProductVariant = (productId, sku) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    await api.deleteProductVariant(productId, sku);
    dispatch(actions.deleteVariantSuccess(sku));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

export const getRelatedProducts = (id) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    if (reducer.related?.[id]) {
      dispatch(actions.relatedExists(id));
    } else {
      const fptRes = await getRelatedItems(id);
      const listIds = fptRes.data.data.map((x) => x.id);
      const { data } = await api.getRelatedProduct(listIds.slice(0, 5));
      dispatch(
        actions.getRelatedSuccess({
          _id: id,
          listIds: fptRes.data.data,
          products: data.data
        })
      );
    }
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

export const getProductForYou = (userId) => async (dispatch) => {
  try {
    dispatch(actions.forYouStartLoading());
    const fptRes = await getUserBasedRecommendation(userId);
    const listIds = fptRes.data.data.map((x) => x.id);
    const { data } = await api.getRelatedProduct(listIds.slice(0, 10));
    if (!data.data.length) {
      throw new Error('No data');
    }
    dispatch(actions.forYouGetSuccess({ list: data.data }));
  } catch {
    try {
      const { data } = await api.getBestSellerProduct();
      dispatch(actions.forYouGetSuccess({ list: data.data }));
    } catch (e) {
      dispatch(actions.forYouHasError(e));
    }
  }
};
