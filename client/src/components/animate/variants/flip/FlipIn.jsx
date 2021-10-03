// ----------------------------------------------------------------------

const TRANSITION_ENTER = {
  duration: 0.64,
  ease: [0.43, 0.13, 0.23, 0.96]
};
const TRANSITION_EXIT = {
  duration: 0.48,
  ease: [0.43, 0.13, 0.23, 0.96]
};

export const varFlipInX = {
  initial: { rotateX: -180, opacity: 0 },
  animate: { rotateX: 0, opacity: 1, transition: TRANSITION_ENTER },
  exit: { rotateX: -180, opacity: 0, transition: TRANSITION_EXIT }
};

export const varFlipInY = {
  initial: { rotateY: -180, opacity: 0 },
  animate: { rotateY: 0, opacity: 1, transition: TRANSITION_ENTER },
  exit: { rotateY: -180, opacity: 0, transition: TRANSITION_EXIT }
};
