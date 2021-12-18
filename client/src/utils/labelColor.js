export const getOrderStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      // confirmed, shipping
      return 'info';
  }
};

export const getPaymentStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'paid':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'info';
  }
};
