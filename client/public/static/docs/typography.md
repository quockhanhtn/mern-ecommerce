---
title: Typography
---

## Typography

#### [Foundations - typography](https://minimals.cc/components/typography)

---

##### Using Google fonts

Enter in the `<head>` tag of the file `public/index.html`

`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;1,700&display=swap"
      rel="stylesheet"
    />
  </head>

  <body>
    ...
  </body>
</html>
```

<br/>

##### Using local font

`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="%PUBLIC_URL%/fonts/index.css" />
  </head>

  <body>
    ...
  </body>
</html>
```

`public/fonts/index.css`

```scss
@font-face {
  font-family: 'CircularStd';
  font-weight: 400;
  font-style: normal;
  src: local('CircularStd'), url('CircularStd-Book.otf') format('opentype');
}
@font-face {
  font-family: 'CircularStd';
  font-weight: 500;
  font-style: normal;
  src: local('CircularStd'), url('CircularStd-Medium.otf') format('opentype');
}
@font-face {
  font-family: 'CircularStd';
  font-weight: 700;
  font-style: normal;
  src: local('CircularStd'), url('CircularStd-Bold.otf') format('opentype');
}
```

<br/>

#### Usage

`src/theme/typography.js`

```js
const FONT_PRIMARY = 'Open Sans, sans-serif';
const FONT_SECONDARY = 'CircularStd, sans-serif';

const Typography = {
  fontFamily: FONT_PRIMARY,
  h1: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 600,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40)
  }
};
```

<br/>

###### You can match with [typography](https://minimals.cc/components/typography) to see the change.
