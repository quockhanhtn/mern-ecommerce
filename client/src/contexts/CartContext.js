import PropTypes from 'prop-types';
import { createContext, useReducer } from 'react';
import * as Helper from '../helper/cartHelper';

// ----------------------------------------------------------------------
const initialState = {
  quantityInCart: 0,
  cart: [],
  activeStep: 0
};

const handlers = {
  GET_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart,
    totalPrice: action.payload.totalPrice
  }),
  ADD_TO_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart,
    totalPrice: action.payload.totalPrice
  }),
  REMOVE_TO_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart,
    totalPrice: action.payload.totalPrice
  }),
  INCREASE_PRODUCT_IN_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart,
    totalPrice: action.payload.totalPrice
  }),
  DECREASE_PRODUCT_IN_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart,
    totalPrice: action.payload.totalPrice
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

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const CartContext = createContext({
  quantityInCart: 0,
  cart: [],
  activeStep: 0,
  totalPrice: 0,
  getCart: () => Promise.resolve(),
  addToCart: () => Promise.resolve(),
  removeToCart: () => Promise.resolve(),
  increaseProductInCart: () => Promise.resolve(),
  decreaseProductInCart: () => Promise.resolve(),
  nextStepPayment: () => Promise.resolve(),
  backStepPayment: () => Promise.resolve(),
  getStepPayment: () => Promise.resolve()
});

CartProvider.propTypes = {
  children: PropTypes.node
};

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCartAction = async () => {
    const cart = Helper.getCart();
    const totalPrice = Helper.getSubTotal(cart);
    dispatch({ type: 'GET_CART', payload: { cart, totalPrice } });
  };

  const addToCartAction = async (productInCartInfo) => {
    const cart = Helper.addProductToCartByLocalStorage(productInCartInfo);
    const totalPrice = Helper.getSubTotal(cart);
    dispatch({ type: 'ADD_TO_CART', payload: { cart, totalPrice } });
  };

  const removeToCartAction = async (_id, skuVariant) => {
    const cart = Helper.removeProductInCartByLocalStorage(_id, skuVariant);
    const totalPrice = Helper.getSubTotal(cart);
    dispatch({ type: 'REMOVE_TO_CART', payload: { cart, totalPrice } });
  };

  const increaseProductInCartAction = async (_id, skuVariant) => {
    const cart = Helper.increaseProductInCartLocalStorage(_id, skuVariant);
    const totalPrice = Helper.getSubTotal(cart);
    dispatch({ type: 'INCREASE_PRODUCT_IN_CART', payload: { cart, totalPrice } });
  };

  const decreaseProductInCartAction = async (_id, skuVariant) => {
    const cart = Helper.decreaseProductInCartLocalStorage(_id, skuVariant);
    const totalPrice = Helper.getSubTotal(cart);
    dispatch({ type: 'DECREASE_PRODUCT_IN_CART', payload: { cart, totalPrice } });
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
    <CartContext.Provider
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
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
