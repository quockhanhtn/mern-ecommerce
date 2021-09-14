// ----------------------------------------------------------------------

const TRANSITION_ENTER = {
  duration: 0.64,
  ease: [0.43, 0.13, 0.23, 0.96]
};
const TRANSITION_EXIT = {
  duration: 0.48,
  ease: [0.43, 0.13, 0.23, 0.96]
};

export const varScaleInX = {
  initial: { scaleX: 0, opacity: 0 },
  animate: { scaleX: 1, opacity: 1, transition: TRANSITION_ENTER },
  exit: { scaleX: 0, opacity: 0, transition: TRANSITION_EXIT }
};

export const varScaleInY = {
  initial: { scaleY: 0, opacity: 0 },
  animate: { scaleY: 1, opacity: 1, transition: TRANSITION_ENTER },
  exit: { scaleY: 0, opacity: 0, transition: TRANSITION_EXIT }
};
