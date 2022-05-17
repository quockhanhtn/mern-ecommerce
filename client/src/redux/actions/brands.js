// import * as actionTypes from '../../constants/actionTypes';
// import * as api from '../../api';

// const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

// export const getAllBrands = (isSimple) => async (dispatch) => {
//   try {
//     dispatch({ type: actionTypes.START_LOADING });

//     const { data } = await api.getAllBrand(isSimple ? 'name slug image' : null);
//     if (isDev) console.log('[actions][brands][getAll] result', data);

//     dispatch({
//       type: isSimple ? actionTypes.BRAND.GET_ALL_SIMPLE : actionTypes.BRAND.GET_ALL,
//       payload: data
//     });
//     dispatch({ type: actionTypes.END_LOADING });
//   } catch (e) {
//     console.error('[actions][brands][getAll] error', e);
//     dispatch({ type: actionTypes.HAS_ERROR });
//   }
// };

// export const createBrand = (newBrand) => async (dispatch) => {
//   try {
//     dispatch({ type: actionTypes.START_LOADING });

//     if (isDev) console.log('[actions][brands][create] dataInput', newBrand);
//     const { data } = await api.createBrand(newBrand);
//     if (isDev) console.log('[actions][brands][create] result', data);

//     dispatch({ type: actionTypes.BRAND.CREATE, payload: data });
//     dispatch({ type: actionTypes.END_LOADING });
//   } catch (e) {
//     console.error('[actions][brands][create] error', e);
//     dispatch({ type: actionTypes.HAS_ERROR });
//   }
// };

// export const updateBrand = (id, updateBrand) => async (dispatch) => {
//   try {
//     dispatch({ type: actionTypes.START_LOADING });

//     if (isDev) console.log('[actions][brands][update] dataInput', updateBrand);
//     const { data } = await api.updateBrand(id, updateBrand);
//     if (isDev) console.log('[actions][brands][update] result', data);

//     dispatch({ type: actionTypes.BRAND.UPDATE, payload: data.data });
//     dispatch({ type: actionTypes.END_LOADING });
//   } catch (e) {
//     console.error('Error when get posts in actions/brands/updateBrand', e);
//     dispatch({ type: actionTypes.HAS_ERROR });
//   }
// };

// export const deleteBrand = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: actionTypes.START_LOADING });

//     if (isDev) console.error('[actions][brands][delete] dataInput', id);
//     await api.deleteBrand(id);

//     dispatch({ type: actionTypes.BRAND.DELETE, payload: id });
//     dispatch({ type: actionTypes.END_LOADING });
//   } catch (e) {
//     if (isDev) console.error('[actions][brands][delete] error', e);
//     dispatch({ type: actionTypes.HAS_ERROR });
//   }
// };
