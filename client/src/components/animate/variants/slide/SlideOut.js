// ----------------------------------------------------------------------

const DISTANCE = 160;

const TRANSITION_ENTER = {
  duration: 0.64,
  ease: [0.43, 0.13, 0.23, 0.96]
};

const TRANSITION_EXIT = {
  duration: 0.48,
  ease: [0.43, 0.13, 0.23, 0.96]
};

export const varSlideOutUp = {
  initial: { y: 0 },
  animate: { y: -DISTANCE, transition: TRANSITION_ENTER },
  exit: { y: 0, transition: TRANSITION_EXIT }
};

export const varSlideOutDown = {
  initial: { y: 0 },
  animate: { y: DISTANCE, transition: TRANSITION_ENTER },
  exit: { y: 0, transition: TRANSITION_EXIT }
};

export const varSlideOutLeft = {
  initial: { x: 0 },
  animate: { x: -DISTANCE, transition: TRANSITION_ENTER },
  exit: { x: 0, transition: TRANSITION_EXIT }
};

export const varSlideOutRight = {
  initial: { x: 0 },
  animate: { x: DISTANCE, transition: TRANSITION_ENTER },
  exit: { x: 0, transition: TRANSITION_EXIT }
};
