// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    pageOne: path(ROOTS_DASHBOARD, '/one'),
    pageBrand: path(ROOTS_DASHBOARD, '/brand'),
    pageThree: path(ROOTS_DASHBOARD, '/three')
  },
  app: {
    root: path(ROOTS_DASHBOARD, '/app'),
    categories: path(ROOTS_DASHBOARD, '/app/categories'),
    brands: path(ROOTS_DASHBOARD, '/app/brands'),
    pageFour: path(ROOTS_DASHBOARD, '/app/four'),
    pageFive: path(ROOTS_DASHBOARD, '/app/five'),
    pageSix: path(ROOTS_DASHBOARD, '/app/six')
  }
};
