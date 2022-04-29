import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

// ----------------------------------------------------------------------

const ScrollToTop = () => {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (ref?.current?.scrollIntoView) {
      ref.current.scrollIntoView();
    }
  }, [location]);

  return <div ref={ref} />;
};

export default ScrollToTop;
