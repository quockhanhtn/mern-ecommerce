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

export const varSlideInUp = {
  initial: { y: DISTANCE },
  animate: { y: 0, transition: TRANSITION_ENTER },
  exit: { y: DISTANCE, transition: TRANSITION_EXIT }
};

export const varSlideInDown = {
  initial: { y: -DISTANCE },
  animate: { y: 0, transition: TRANSITION_ENTER },
  exit: { y: -DISTANCE, transition: TRANSITION_EXIT }
};

export const varSlideInLeft = {
  initial: { x: -DISTANCE },
  animate: { x: 0, transition: TRANSITION_ENTER },
  exit: { x: -DISTANCE, transition: TRANSITION_EXIT }
};

export const varSlideInRight = {
  initial: { x: DISTANCE },
  animate: { x: 0, transition: TRANSITION_ENTER },
  exit: { x: DISTANCE, transition: TRANSITION_EXIT }
};
