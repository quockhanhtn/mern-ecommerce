// ----------------------------------------------------------------------

const TRANSITION_EXIT = {
  duration: 0.48,
  ease: [0.43, 0.13, 0.23, 0.96]
};

export const varRotateOut = {
  initial: { opacity: 1, rotate: 0 },
  animate: { opacity: 0, rotate: -360, transition: TRANSITION_EXIT }
};
