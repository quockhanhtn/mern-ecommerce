// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    statics: path(ROOTS_DASHBOARD, '/statics'),
    config: path(ROOTS_DASHBOARD, '/config')
  },
  app: {
    root: path(ROOTS_DASHBOARD, '/app'),
    categories: path(ROOTS_DASHBOARD, '/app/categories'),
    brands: path(ROOTS_DASHBOARD, '/app/brands'),
    discounts: path(ROOTS_DASHBOARD, '/app/discounts'),
    products: {
      root: path(ROOTS_DASHBOARD, '/app/products'),
      list: path(ROOTS_DASHBOARD, '/app/products/list'),
      add: path(ROOTS_DASHBOARD, '/app/products/create')
    },
    users: {
      root: path(ROOTS_DASHBOARD, '/app/users'),
      user_list: path(ROOTS_DASHBOARD, '/app/users/user_list'),
      employee_list: path(ROOTS_DASHBOARD, '/app/users/employee_list')
    },
    account_setting: path(ROOTS_DASHBOARD, '/app/setting'),
    profile: path(ROOTS_DASHBOARD, '/app/profile')
  }
};
