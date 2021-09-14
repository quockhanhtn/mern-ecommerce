// ----------------------------------------------------------------------

const TRANSITION_ENTER = {
  duration: 0.64,
  ease: [0.43, 0.13, 0.23, 0.96]
};

export const varScaleOutX = {
  initial: { scaleX: 1, opacity: 1 },
  animate: { scaleX: 0, opacity: 0, transition: TRANSITION_ENTER }
};

export const varScaleOutY = {
  initial: { scaleY: 1, opacity: 1 },
  animate: { scaleY: 0, opacity: 0, transition: TRANSITION_ENTER }
};
