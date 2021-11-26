import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

// ----------------------------------------------------------------------

const useToCart = () => useContext(CartContext);

export default useToCart;
