// ----------------------------------------------------------------------

const TRANSITION = {
  duration: 4,
  ease: 'linear'
};

const gradient = (deg) => `linear-gradient(${deg}deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)`;

export const varPanTop = {
  animate: {
    backgroundImage: [gradient(0), gradient(0)],
    backgroundPosition: ['center 99%', 'center 1%'],
    backgroundSize: ['100% 600%', '100% 600%'],
    transition: TRANSITION
  }
};

export const varPanBottom = {
  animate: {
    backgroundImage: [gradient(0), gradient(0)],
    backgroundPosition: ['center 1%', 'center 99%'],
    backgroundSize: ['100% 600%', '100% 600%'],
    transition: TRANSITION
  }
};

export const varPanLeft = {
  animate: {
    backgroundPosition: ['99% center', '1% center'],
    backgroundImage: [gradient(270), gradient(270)],
    backgroundSize: ['600% 100%', '600% 100%'],
    transition: TRANSITION
  }
};

export const varPanRight = {
  animate: {
    backgroundPosition: ['1% center', '99% center'],
    backgroundImage: [gradient(270), gradient(270)],
    backgroundSize: ['600% 100%', '600% 100%'],
    transition: TRANSITION
  }
};
