import { useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';

// ----------------------------------------------------------------------

const useOrderFlow = () => useContext(OrderContext);

export default useOrderFlow;
