// ----------------------------------------------------------------------

const TRANSITION = {
  duration: 5,
  ease: 'easeOut'
};

export const varKenburnsTop = {
  animate: {
    scale: [1, 1.25],
    y: [0, -15],
    transformOrigin: ['50% 16%', 'top'],
    transition: TRANSITION
  }
};

export const varKenburnsBottom = {
  animate: {
    scale: [1, 1.25],
    y: [0, 15],
    transformOrigin: ['50% 84%', 'bottom'],
    transition: TRANSITION
  }
};

export const varKenburnsLeft = {
  animate: {
    scale: [1, 1.25],
    x: [0, -20],
    y: [0, 15],
    transformOrigin: ['16% 50%', 'left'],
    transition: TRANSITION
  }
};

export const varKenburnsRight = {
  animate: {
    scale: [1, 1.25],
    x: [0, 20],
    y: [0, -15],
    transformOrigin: ['84% 50%', 'right'],
    transition: TRANSITION
  }
};
