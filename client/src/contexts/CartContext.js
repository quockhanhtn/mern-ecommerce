import PropTypes from 'prop-types';
import { createContext, useReducer } from 'react';
import * as Helper from '../helper/cartHelper';

// ----------------------------------------------------------------------
const initialState = {
  quantityInCart: 0,
  cart: []
};

const handlers = {
  GET_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart
  }),
  ADD_TO_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart
  }),
  REMOVE_TO_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart
  }),
  INCREASE_PRODUCT_IN_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart
  }),
  DECREASE_PRODUCT_IN_CART: (state, action) => ({
    ...state,
    quantityInCart: action.payload.cart.length,
    cart: action.payload.cart
  })
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const CartContext = createContext({
  quantityInCart: 0,
  cart: [],
  getCart: () => Promise.resolve(),
  addToCart: () => Promise.resolve(),
  removeToCart: () => Promise.resolve(),
  increaseProductInCart: () => Promise.resolve(),
  decreaseProductInCart: () => Promise.resolve()
});

CartProvider.propTypes = {
  children: PropTypes.node
};

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCartAction = async () => {
    const cart = Helper.getCart();
    dispatch({ type: 'GET_CART', payload: { cart } });
  };

  const addToCartAction = async (productInCartInfo) => {
    const cart = Helper.addProductToCartByLocalStorage(productInCartInfo);
    dispatch({ type: 'ADD_TO_CART', payload: { cart } });
  };

  const removeToCartAction = async (_id, skuVariant) => {
    const cart = Helper.removeProductInCartByLocalStorage(_id, skuVariant);
    dispatch({ type: 'REMOVE_TO_CART', payload: { cart } });
  };

  const increaseProductInCartAction = async (_id, skuVariant) => {
    const cart = Helper.increaseProductInCartLocalStorage(_id, skuVariant);
    dispatch({ type: 'INCREASE_PRODUCT_IN_CART', payload: { cart } });
  };

  const decreaseProductInCartAction = async (_id, skuVariant) => {
    const cart = Helper.decreaseProductInCartLocalStorage(_id, skuVariant);
    dispatch({ type: 'DECREASE_PRODUCT_IN_CART', payload: { cart } });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        getCart: getCartAction,
        addToCart: addToCartAction,
        removeToCart: removeToCartAction,
        increaseProductInCart: increaseProductInCartAction,
        decreaseProductInCart: decreaseProductInCartAction
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
