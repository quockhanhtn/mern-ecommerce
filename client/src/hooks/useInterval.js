import { useEffect } from 'react';

// ----------------------------------------------------------------------

/**
 * A hook that calls a function at a specified interval.
 * @param {*} callback - function to be called after the specified time
 * @param {*} delay - time in seconds
 * @param {*} deps - dependencies to be watched
 */
export default function useInterval(callback, delay, deps = []) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      callback();
    }, delay * 1000);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
