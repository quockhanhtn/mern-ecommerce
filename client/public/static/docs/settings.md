---
title: Settings
---

## Settings

---

#### 1.How to set default settings?

```js
// src/contexts/SettingsContext.js;

const initialState = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColor: 'default'
};
```

<br/>

#### 2.How to using right-to-left layout?

```js
import RtlLayout from './components/RtlLayout';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <RtlLayout>...</RtlLayout>
    </ThemeConfig>
  );
}
```

<br/>

#### 3.How to using change primary color theme?

```js
import ThemePrimaryColor from './components/ThemePrimaryColor';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ThemePrimaryColor>...</ThemePrimaryColor>
    </ThemeConfig>
  );
}
```

<br/>

#### 4.How to use the default theme?

```js
export default function ThemeConfig({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette: palette.light, // using palette.dark for dark theme
      shape,
      typography,
      breakpoints,
      shadows: shadows.light, // using shadows.dark for dark theme
      customShadows: customShadows.light // using customShadows.dark for dark theme
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
```
