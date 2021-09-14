---
title: Shadows
---

## Shadows

#### [Foundations - shadows](https://minimals.cc/components/shadows)

---

Custom shadows inside `src/theme/shadows.js`

```js
// Color shadow in Light mode
const LIGHT_MODE = palette.light.grey[500];

// Color shadow in Dark mode
const DARK_MODE = '#000000';
```

This is apply for **24** shadow default form Material UI

<br/>

#### Customizing or adding shadows

```js
const createShadow = (color) => {
  const transparent1 = alpha(color, 0.2);
  const transparent2 = alpha(color, 0.14);
  const transparent3 = alpha(color, 0.12);
  return [
    'none',
    `0px 2px 1px -1px ${transparent1},0px 1px 1px 0px ${transparent2},0px 1px 3px 0px ${transparent3}`,
    `0px 3px 1px -2px ${transparent1},0px 2px 2px 0px ${transparent2},0px 1px 5px 0px ${transparent3}`,
    `0px 3px 3px -2px ${transparent1},0px 3px 4px 0px ${transparent2},0px 1px 8px 0px ${transparent3}`,
    `0px 2px 4px -1px ${transparent1},0px 4px 5px 0px ${transparent2},0px 1px 10px 0px ${transparent3}`,
    `0px 3px 5px -1px ${transparent1},0px 5px 8px 0px ${transparent2},0px 1px 14px 0px ${transparent3}`,
    `0px 3px 5px -1px ${transparent1},0px 6px 10px 0px ${transparent2},0px 1px 18px 0px ${transparent3}`,
    `0px 4px 5px -2px ${transparent1},0px 7px 10px 1px ${transparent2},0px 2px 16px 1px ${transparent3}`,
    `0px 5px 5px -3px ${transparent1},0px 8px 10px 1px ${transparent2},0px 3px 14px 2px ${transparent3}`,
    `0px 5px 6px -3px ${transparent1},0px 9px 12px 1px ${transparent2},0px 3px 16px 2px ${transparent3}`,
    `0px 6px 6px -3px ${transparent1},0px 10px 14px 1px ${transparent2},0px 4px 18px 3px ${transparent3}`,
    `0px 6px 7px -4px ${transparent1},0px 11px 15px 1px ${transparent2},0px 4px 20px 3px ${transparent3}`,
    `0px 7px 8px -4px ${transparent1},0px 12px 17px 2px ${transparent2},0px 5px 22px 4px ${transparent3}`,
    `0px 7px 8px -4px ${transparent1},0px 13px 19px 2px ${transparent2},0px 5px 24px 4px ${transparent3}`,
    `0px 7px 9px -4px ${transparent1},0px 14px 21px 2px ${transparent2},0px 5px 26px 4px ${transparent3}`,
    `0px 8px 9px -5px ${transparent1},0px 15px 22px 2px ${transparent2},0px 6px 28px 5px ${transparent3}`,
    `0px 8px 10px -5px ${transparent1},0px 16px 24px 2px ${transparent2},0px 6px 30px 5px ${transparent3}`,
    `0px 8px 11px -5px ${transparent1},0px 17px 26px 2px ${transparent2},0px 6px 32px 5px ${transparent3}`,
    `0px 9px 11px -5px ${transparent1},0px 18px 28px 2px ${transparent2},0px 7px 34px 6px ${transparent3}`,
    `0px 9px 12px -6px ${transparent1},0px 19px 29px 2px ${transparent2},0px 7px 36px 6px ${transparent3}`,
    `0px 10px 13px -6px ${transparent1},0px 20px 31px 3px ${transparent2},0px 8px 38px 7px ${transparent3}`,
    `0px 10px 13px -6px ${transparent1},0px 21px 33px 3px ${transparent2},0px 8px 40px 7px ${transparent3}`,
    `0px 10px 14px -6px ${transparent1},0px 22px 35px 3px ${transparent2},0px 8px 42px 7px ${transparent3}`,
    `0px 11px 14px -7px ${transparent1},0px 23px 36px 3px ${transparent2},0px 9px 44px 8px ${transparent3}`,
    `0px 11px 15px -7px ${transparent1},0px 24px 38px 3px ${transparent2},0px 9px 46px 8px ${transparent3}`
  ];
};

const createCustomShadow = (color) => {
  const transparent = alpha(color, 0.24);
  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 0 2px 0 ${transparent}, 0 12px 24px 0 ${transparent}`,
    z16: `0 0 2px 0 ${transparent}, 0 16px 32px -4px ${transparent}`,
    z20: `0 0 2px 0 ${transparent}, 0 20px 40px -4px ${transparent}`,
    z24: `0 0 4px 0 ${transparent}, 0 24px 48px 0 ${transparent}`,
    primary: `0 8px 16px 0 ${alpha(palette.light.primary.main, 0.24)}`,
    info: `0 8px 16px 0 ${alpha(palette.light.info.main, 0.24)}`,
    success: `0 8px 16px 0 ${alpha(palette.light.success.main, 0.24)}`,
    warning: `0 8px 16px 0 ${alpha(palette.light.warning.main, 0.24)}`,
    error: `0 8px 16px 0 ${alpha(palette.light.error.main, 0.24)}`
  };
};

export const customShadows = {
  light: createCustomShadow(LIGHT_MODE),
  dark: createCustomShadow(DARK_MODE)
};

const shadows = {
  light: createShadow(LIGHT_MODE),
  dark: createShadow(DARK_MODE)
};
```

<br/>

#### Usage

```js
boxShadow: theme.shadows[2],
// Output: 0px 3px 1px -2px rgba(0,0,0,0.2),
// 0px 2px 2px 0px rgba(0,0,0,0.14),
// 0px 1px 5px 0px rgba(0,0,0,0.12)

boxShadow: theme.shadows[24],
// Output: 0px 11px 15px -7px rgba(0,0,0,0.2),
// 0px 24px 38px 3px rgba(0,0,0,0.14),
// 0px 9px 46px 8px rgba(0,0,0,0.12)

boxShadow: theme.customShadows.z8,
// Output: 0 8px 16px 0 rgba(145, 158, 171, 0.24)

boxShadow: theme.customShadows.primary,
// Output: 0 8px 16px 0 rgba(0, 171, 85, 0.24)
```

<br/>

###### You can match with [shadows](https://minimals.cc/components/shadows) to see the change.
