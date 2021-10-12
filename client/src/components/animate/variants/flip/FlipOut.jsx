// ----------------------------------------------------------------------

const TRANSITION_EXIT = {
  duration: 0.48,
  ease: [0.43, 0.13, 0.23, 0.96]
};

export const varFlipOutX = {
  initial: { rotateX: 0, opacity: 1 },
  animate: { rotateX: 70, opacity: 0, transition: TRANSITION_EXIT }
};

export const varFlipOutY = {
  initial: { rotateY: 0, opacity: 1 },
  animate: { rotateY: 70, opacity: 0, transition: TRANSITION_EXIT }
};
