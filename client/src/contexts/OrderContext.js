import PropTypes from 'prop-types';
import { createContext, useReducer } from 'react';
import * as Helper from '../helper/localStorageHelper';

// ----------------------------------------------------------------------
const initialState = {
  orderInfo: {},
  quantityInCart: 0,
  cart: [],
  activeStep: 0
};

const handlers = {
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
  quantityInCart: 0,
  cart: [],
  activeStep: 0,
  subTotal: 0,
  getCart: () => Promise.resolve(),
  addToCart: () => Promise.resolve(),
  removeToCart: () => Promise.resolve(),
  increaseProductInCart: () => Promise.resolve(),
  decreaseProductInCart: () => Promise.resolve(),
  nextStepPayment: () => Promise.resolve(),
  backStepPayment: () => Promise.resolve(),
  getStepPayment: () => Promise.resolve()
});

OrderProvider.propTypes = {
  children: PropTypes.node
};

function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const nextStepPaymentAction = async (step) => {
    const activeStep = Helper.nextStepPayment(step);
    dispatch({ type: 'NEXT_STEP_PAYMENT', payload: { activeStep } });
  };

  const backStepPaymentAction = async (step) => {
    const activeStep = Helper.backStepPayment(step);
    dispatch({ type: 'BACK_STEP_PAYMENT', payload: { activeStep } });
  };

  const getStepPaymentAction = async () => {
    const activeStep = Helper.getStepPayment();
    dispatch({ type: 'GET_STEP_PAYMENT', payload: { activeStep } });
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        getCart: getCartAction,
        addToCart: addToCartAction,
        removeToCart: removeToCartAction,
        increaseProductInCart: increaseProductInCartAction,
        decreaseProductInCart: decreaseProductInCartAction,
        nextStepPayment: nextStepPaymentAction,
        backStepPayment: backStepPaymentAction,
        getStepPayment: getStepPaymentAction
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export { OrderContext, OrderProvider };
