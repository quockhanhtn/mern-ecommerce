---
title: Components
---

## Components

#### [Overview](/components)

[https://next.material-ui.com/customization/theme-components/#global-style-overrides](https://next.material-ui.com/customization/theme-components/#global-style-overrides)

---

Overrides the components of the Material UI in the directory `src/theme/overrides`

```sh
overrides/
  ├── Accordion
  ├── Alert
  ├── Autocomplete
  ├── Avatar
  ├── Backdrop
  ├── ...
...
```

If you customize in file `overrides/Accordion`
you can match with [components/accordion](https://minimals.cc/components/accordion) to see the change.

if you customize in file `overrides/Alert`
you can match with [components/alert](https://minimals.cc/components/alert) to see the change.

> The change will apply globally.

> This helps you to deeply customize your style, to suit your design.

<br/>

### Extending components

**Components extend based on Material-UI.**

Inside the folder `src/components/@material-extend` you can add and edit more components based on Material-UI.

**Example:**

```jsx
<Button variant="contained" color="inherit">Default</Button>
<Button variant="contained">Primary</Button>
<MButton variant="contained" color="info">Info</MButton>
<MButton variant="contained" color="success">Success</MButton>
<MButton variant="contained" color="warning">Warning </MButton>
<MButton variant="contained" color="error">Error </MButton>
```

![img](/static/docs/assets/button.jpg)

**Currently support for the following components:**

- [Avatar](https://minimals.cc/components/avatar)
- [Badge](https://minimals.cc/components/badge)
- [Breadcrumbs](https://minimals.cc/components/breadcrumbs)
- [Buttons](https://minimals.cc/components/buttons)
- [Chip](https://minimals.cc/components/chip)
- [Progress](https://minimals.cc/components/progress)
- [Checkboxes](https://minimals.cc/components/checkbox)
- [Radio Buttons](https://minimals.cc/components/radio-button)
- [Switches](https://minimals.cc/components/switch)
- [Timeline](https://minimals.cc/components/timeline)

All have checks with **PropTypes**:

```js
function Buttons() {
  return;
  <>
    <MButton variant="contained" color="secondary">
      Info
    </MButton>
    <MButton variant="contained" color="info">
      Info
    </MButton>
    <MButton variant="contained" color="error">
      Info
    </MButton>
    ...
  </>;
}

MButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'info', 'success', 'warning', 'error', 'white']),
  variant: PropTypes.oneOfType([PropTypes.oneOf(['contained', 'outlined', 'text']), PropTypes.string])
};
```
