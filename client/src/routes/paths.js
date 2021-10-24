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
    discounts: path(ROOTS_DASHBOARD, '/app/discounts')
  }
};
