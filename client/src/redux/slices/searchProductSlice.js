import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

const initialState = {
  isInitialized: false,
  isLoading: false,
  error: null,
  list: [],
  pagination: null,
  categoryOpts: [],
  selectedCategories: [],
  brandOpts: [],
  selectedBrands: [],

  quickSearch: {
    results: [],
    isLoading: false,
    prevKeyword: ''
  }
};

const searchProductSlice = createSlice({
  name: 'searchProduct',
  initialState,
  reducers: {
    initialSearch(state, action) {
      state.categoryOpts = action.payload.categories;
      state.brandOpts = action.payload.brands;
      state.isInitialized = true;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    searchSuccess(state, action) {
      state.list = action.payload.data;
      state.isLoading = false;
      state.error = null;
      state.pagination = action.payload.pagination;
    },
    setSelectedCategories(state, action) {
      state.selectedCategories = [...action.payload];
    },
    setSelectedBrands(state, action) {
      state.selectedBrands = [...action.payload];
    },

    // #region quick search
    startLoadingQuickSearch(state) {
      state.quickSearch.isLoading = true;
    },
    quickSearchSuccess(state, action) {
      state.quickSearch.isLoading = false;
      state.quickSearch.results = action.payload;
    }
    // #endregion
  }
});

const { actions, reducer } = searchProductSlice;

export const { setSelectedCategories, setSelectedBrands } = actions;

export default reducer;

export const initialSearch = () => async (dispatch) => {
  try {
    const { data: cData } = await api.getAllCategory('_id name slug');
    const { data: bData } = await api.getAllBrand('_id name slug');

    dispatch(actions.initialSearch({ categories: cData.data, brands: bData.data }));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const searchProduct = (options) => async (dispatch, getState) => {
  try {
    dispatch(actions.startLoading());

    const { selectedCategories, selectedBrands } = getState().searchProduct;

    const { search = '', page = 1, limit = 30, sort, sortBy } = options;

    const { data } = await api.getAllProduct2({
      search,
      c: selectedCategories.map((x) => x._id).join(','),
      b: selectedBrands.map((x) => x._id).join(','),
      page,
      limit,
      sort,
      sortBy,
      getBrandFilter: '1',
      getCategoryFilter: '1',
      isShowHidden: '0',
      fullTextSearch: '1'
    });
    dispatch(actions.searchSuccess(data));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const quickSearchProduct = (keyword) => async (dispatch) => {
  try {
    dispatch(actions.startLoadingQuickSearch());
    const { data } = await api.getSearchSuggest(keyword);
    dispatch(actions.quickSearchSuccess(data.data));
  } catch (e) {
    // console.log(e);
  }
};
