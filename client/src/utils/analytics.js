import { googleAnalyticsConfig } from '../config';

// ----------------------------------------------------------------------

const setup = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  if (!window.gtag) {
    return;
  }
  window.gtag(...args);
};

const track = {
  pageview: (props) => {
    setup('config', googleAnalyticsConfig, props);
  },
  event: (type, props) => {
    setup('event', type, props);
  }
};

export default track;
