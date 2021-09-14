---
title: Environment Variables
---

## Environment Variables

---

Your project can consume variables declared in your environment as if they were declared locally in your JS files. By default you will have `NODE_ENV` defined for you, and any other environment variables starting with `REACT_APP_`.

> WARNING: Do not store any secrets (such as private API keys) in your React app! Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files.

> Note: You must create custom environment variables beginning with `REACT_APP_`. Any other variables except NODE_ENV will be ignored to avoid accidentally exposing a private key on the machine that could have the same name. Changing any environment variables will require you to restart the development server if it is running.

#### Example

```js
REACT_APP_MAP_GOOGLE= YOUR SECRET KEY
REACT_APP_MAP_MAPBOX= YOUR SECRET KEY
REACT_APP_WEBSITE_NAME= Minimal UI Kit
```

Having access to the `NODE_ENV` is also useful for performing actions conditionally:

```js
if (process.env.NODE_ENV !== 'production') {
  console.log('This is production');
} else {
  console.log('This is development');
}
```

<br/>

#### Usage in HTML

```html
<title>%REACT_APP_WEBSITE_NAME%</title>
```

Learn more: [https://create-react-app.dev/docs/adding-custom-environment-variables/](https://create-react-app.dev/docs/adding-custom-environment-variables/)
