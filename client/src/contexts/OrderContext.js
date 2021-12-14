import PropTypes from 'prop-types';
import { createContext, useReducer } from 'react';
import * as Api from '../api';
import * as Helper from '../helper/localStorageHelper';

// ----------------------------------------------------------------------
const initialState = {
  orderInfo: {},
  isCreatingOrder: false,
  orderCreated: null,
  orderError: null,

  quantityInCart: 0,
  cart: [],
  activeStep: 0
};

const handlers = {
  UPDATE_ORDER_INFO: (state, action) => ({
    ...state,
    orderInfo: { ...state.orderInfo, ...action.payload }
  }),

  CREATING_ORDER: (state, action) => ({
    ...state,
    isCreatingOrder: true,
    orderError: null
  }),

  CREATED_ORDER: (state, action) => ({
    ...state,
    isCreatingOrder: false,
    orderCreated: action.payload,
    orderError: null
  }),

  ERROR_ORDER: (state, action) => ({
    ...state,
    isCreatingOrder: false,
    orderError: action.payload
  }),

  GET_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart,
    subTotal: action.payload.subTotal
  }),
  ADD_TO_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart,
    subTotal: action.payload.subTotal
  }),
  REMOVE_TO_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart,
    subTotal: action.payload.subTotal
  }),
  INCREASE_PRODUCT_IN_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart,
    subTotal: action.payload.subTotal
  }),
  DECREASE_PRODUCT_IN_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart,
    subTotal: action.payload.subTotal
  }),
  NEXT_STEP_PAYMENT: (state, action) => ({
    ...state,
    activeStep: action.payload.activeStep
  }),
  BACK_STEP_PAYMENT: (state, action) => ({
    ...state,
    activeStep: action.payload.activeStep
  }),
  GET_STEP_PAYMENT: (state, action) => ({
    ...state,
    activeStep: action.payload.activeStep
  })
};

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const OrderContext = createContext({
  orderInfo: {},
  isCreatingOrder: false,
  orderCreated: null,
  orderError: null,

  quantityInCart: 0,
  cart: [],
  activeStep: 0,
  subTotal: 0,
  getCart: () => Promise.resolve(),
  addToCart: () => Promise.resolve(),
  removeToCart: () => Promise.resolve(),
  increaseProductInCart: () => Promise.resolve(),
  decreaseProductInCart: () => Promise.resolve(),
  nextStepOrder: () => Promise.resolve(),
  backStepOrder: () => Promise.resolve(),
  getStepOrder: () => Promise.resolve()
});

OrderProvider.propTypes = {
  children: PropTypes.node
};

function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateOrderAction = async (data) => {
    dispatch({ type: 'UPDATE_ORDER_INFO', payload: data });
  };

  const createOrderAction = async (orderData) => {
    try {
      dispatch({ type: 'CREATING_ORDER' });

      const customer = {
        name: state.orderInfo.name,
        phone: state.orderInfo.phone
      };

      const address = {
        street: state.orderInfo.street,
        ward: state.orderInfo.ward,
        district: state.orderInfo.district,
        province: state.orderInfo.province,
        name: state.orderInfo.name,
        phone: state.orderInfo.phone
      };

      const dataToSend = {
        ...orderData,
        ...state.orderInfo,
        customerInfo: customer,
        address,
        items: state.cart.map((item) => ({
          product: item._id,
          sku: item.skuVariant,
          quantity: item.quantity
        }))
      };
      console.log('[OrderContext] createOrderAction', dataToSend);
      const { data } = await Api.createOrder(dataToSend);
      console.log('[OrderContext] createOrderAction', data);

      dispatch({
        type: 'CREATED_ORDER',
        payload: {
          ...data.data,
          paymentUrl: data.paymentUrl
        }
      });
    } catch (e) {
      dispatch({ type: 'ERROR_ORDER', payload: e?.response?.data || e });
    }
  };

  const getCartAction = async () => {
    const cart = Helper.getCart();
    const subTotal = Helper.getSubTotal(cart);
    dispatch({ type: 'GET_CART', payload: { cart, subTotal } });
  };

  const addToCartAction = async (productInCartInfo) => {
    const cart = Helper.addProductToCart(productInCartInfo);
    const subTotal = Helper.getSubTotal(cart);
    dispatch({ type: 'ADD_TO_CART', payload: { cart, subTotal } });
  };

  const removeToCartAction = async (_id, skuVariant) => {
    const cart = Helper.removeProductInCart(_id, skuVariant);
    const subTotal = Helper.getSubTotal(cart);
    dispatch({ type: 'REMOVE_TO_CART', payload: { cart, subTotal } });
  };

  const increaseProductInCartAction = async (_id, skuVariant) => {
    const cart = Helper.increaseProductInCart(_id, skuVariant);
    const subTotal = Helper.getSubTotal(cart);
    dispatch({ type: 'INCREASE_PRODUCT_IN_CART', payload: { cart, subTotal } });
  };

  const decreaseProductInCartAction = async (_id, skuVariant) => {
    const cart = Helper.decreaseProductInCart(_id, skuVariant);
    const subTotal = Helper.getSubTotal(cart);
    dispatch({ type: 'DECREASE_PRODUCT_IN_CART', payload: { cart, subTotal } });
  };

  const nextStepOrderAction = async (step) => {
    const activeStep = Helper.nextStepOrder(step);
    dispatch({ type: 'NEXT_STEP_PAYMENT', payload: { activeStep } });
  };

  const backStepOrderAction = async (step) => {
    const activeStep = Helper.backStepOrder(step);
    dispatch({ type: 'BACK_STEP_PAYMENT', payload: { activeStep } });
  };

  const getStepOrderAction = async () => {
    const activeStep = Helper.getStepOrder();
    dispatch({ type: 'GET_STEP_PAYMENT', payload: { activeStep } });
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        updateOrderInfo: updateOrderAction,
        createOrder: createOrderAction,

        getCart: getCartAction,
        addToCart: addToCartAction,
        removeToCart: removeToCartAction,
        increaseProductInCart: increaseProductInCartAction,
        decreaseProductInCart: decreaseProductInCartAction,
        nextStepOrder: nextStepOrderAction,
        backStepOrder: backStepOrderAction,
        getStepOrder: getStepOrderAction
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export { OrderContext, OrderProvider };
