// import * as actionTypes from '../../constants/actionTypes';

// const initialState = {
//   addresses: {
//     isLoading: false,
//     error: null,
//     list: []
//   }
// };

// const accountReducer = (state = initialState, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     // addresses
//     case actionTypes.ACCOUNT.ADDRESS.START_LOADING:
//       return { ...state, addresses: { ...state.addresses, isLoading: true } };
//     case actionTypes.ACCOUNT.ADDRESS.END_LOADING:
//       return { ...state, addresses: { ...state.addresses, isLoading: false } };
//     case actionTypes.ACCOUNT.ADDRESS.ERROR:
//       return { ...state, addresses: { ...state.addresses, error: payload } };
//     case actionTypes.ACCOUNT.ADDRESS.GET_ALL:
//       return { ...state, addresses: { ...state.addresses, list: payload?.data || [] } };
//     case actionTypes.ACCOUNT.ADDRESS.CREATE:
//       return { ...state, addresses: { ...state.addresses, list: [...state.addresses.list, payload?.data] } };
//     case actionTypes.ACCOUNT.ADDRESS.UPDATE:
//       return {
//         ...state,
//         addresses: {
//           ...state.addresses,
//           list: state.addresses.list.map((a) => (a._id === payload.data._id ? payload.data : a))
//         }
//       };
//     case actionTypes.ACCOUNT.ADDRESS.DELETE:
//       return {
//         ...state,
//         addresses: {
//           ...state.addresses,
//           list: state.addresses.list.filter((address) => address._id !== payload._id)
//         }
//       };

//     default:
//       return state;
//   }
// };

// export default accountReducer;
