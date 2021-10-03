// ----------------------------------------------------------------------

const DISTANCE = 720;
const IN = { scale: 1, opacity: 1 };
const Out = { scale: 0, opacity: 0 };

const TRANSITION_ENTER = {
  duration: 0.64,
  ease: [0.43, 0.13, 0.23, 0.96]
};

export const varZoomOut = {
  initial: { scale: 1 },
  animate: { scale: 0, transition: TRANSITION_ENTER }
};

export const varZoomOutUp = {
  initial: IN,
  animate: { ...Out, translateY: -DISTANCE, transition: TRANSITION_ENTER }
};

export const varZoomOutDown = {
  initial: IN,
  animate: { ...Out, translateY: DISTANCE, transition: TRANSITION_ENTER }
};

export const varZoomOutLeft = {
  initial: IN,
  animate: { ...Out, translateX: -DISTANCE, transition: TRANSITION_ENTER }
};

export const varZoomOutRight = {
  initial: IN,
  animate: { ...Out, translateX: DISTANCE, transition: TRANSITION_ENTER }
};
