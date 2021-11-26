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
    quantityInCart: action.payload,
    cart: action.payload
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
  removeToCart: () => Promise.resolve()
});

CartProvider.propTypes = {
  children: PropTypes.node
};

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCartAction = async () => {
    const cart = Helper.getCart();
    dispatch({ type: 'ADD_TO_CART', payload: { cart } });
  };

  const addToCartAction = async (productInCartInfo) => {
    const cart = Helper.addProductToCartByLocalStorage(productInCartInfo);
    dispatch({ type: 'ADD_TO_CART', payload: { cart } });
  };

  const removeToCartAction = async () => {
    // handle
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        getCart: getCartAction,
        addToCart: addToCartAction,
        removeToCart: removeToCartAction
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
