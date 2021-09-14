---
title: Icons
---

## Icons

###### [Visit here](https://minimals.cc/components/icons)

---

##### Material Icon

[https://material-ui.com/components/material-icons](https://material-ui.com/components/material-icons)

```js
import AdbIcon from '@material-ui/icons/Adb';
import AddIcon from '@material-ui/icons/Add';
import AppleIcon from '@material-ui/icons/Apple';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';

// ----------------------------------------------------------------------

function IconMaterial() {
  return (
    <>
      <AdbIcon color="action" />
      <AddIcon color="disabled" />
      <AccountCircleIcon color="error" />
      <AirplanemodeActiveIcon color="inherit" />
      <AppleIcon color="primary" />
      <AppleIcon color="secondary" />
    </>
  );
}
```

<br />

##### Iconify Icon

[https://iconify.design/icon-sets](https://iconify.design/icon-sets)

```js
import { Icon } from '@iconify/react';
import { SvgIcon } from '@material-ui/core';
import clockFill from '@iconify/icons-eva/clock-fill';
import chargingFill from '@iconify/icons-eva/charging-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import colorPaletteFill from '@iconify/icons-eva/color-palette-fill';
import arrowCircleDownFill from '@iconify/icons-eva/arrow-circle-down-fill';

// ----------------------------------------------------------------------

function IconIconify() {
  return (
    <>
      <SvgIcon color="action">
        <Icon icon={alertCircleFill} width={24} height={24} />
      </SvgIcon>
      <SvgIcon color="disabled">
        <Icon icon={chargingFill} width={24} height={24} />
      </SvgIcon>
      <SvgIcon color="error">
        <Icon icon={arrowCircleDownFill} width={24} height={24} />
      </SvgIcon>
      <SvgIcon color="inherit">
        <Icon icon={clockFill} width={24} height={24} />
      </SvgIcon>
      <SvgIcon color="primary">
        <Icon icon={colorPaletteFill} width={24} height={24} />
      </SvgIcon>
      <SvgIcon color="secondary">
        <Icon icon={colorPaletteFill} width={24} height={24} />
      </SvgIcon>
    </>
  );
}
```

<br />

##### Local Icon

```js
import SvgIconStyle from 'src/components/SvgIconStyle';

// ----------------------------------------------------------------------

function IconLocal() {
  return (
    <>
      <SvgIconStyle src="/static/icons/browser-edge.svg" />
      <SvgIconStyle src="/static/icons/browser-edge.svg" color="action" />
      <SvgIconStyle src="/static/icons/browser-edge.svg" color="disabled" />
      <SvgIconStyle src="/static/icons/browser-edge.svg" color="primary" />
      <SvgIconStyle src="/static/icons/browser-edge.svg" color="secondary" />
      <SvgIconStyle src="/static/icons/elephant.svg" color="info" />
      <SvgIconStyle src="/static/icons/json-logo.svg" color="success" />
      <SvgIconStyle src="/static/icons/love-camera.svg" color="warning" />
      <SvgIconStyle src="/static/icons/shield.svg" color="error" />
    </>
  );
}
```
