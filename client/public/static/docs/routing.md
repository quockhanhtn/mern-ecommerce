---
title: Routing
---

## Routing

The routing is based on [react-router-dom](https://reactrouter.com/web/guides/quick-start).

In this page you will find how to add new routes and how we handle existing routes.

---

You can find the template's router configuration in `src/router/index.js` contains all routes of our template.

#### 1.How to add a new route?

**a. At `src/routes/index.js` call new path from `src/routes/paths.js`**

```js
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComponentsOverview = Loadable(lazy(() => import('../pages/ComponentsOverview')));
const Color = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationColor')));
const Typography = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationTypography')));

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <LandingPage /> },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
        {
          path: 'components',
          children: [
            { path: '/', element: <ComponentsOverview /> },
            { path: 'color', element: <Color /> },
            { path: 'typography', element: <Typography /> }
          ]
        }
      ]
    }
  ]);
}
```

**b.Usage for Link**

```js
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

// ----------------------------------------------------------------------

<Link underline="none" variant="subtitle2" component={RouterLink} to="/about-us">
  Go to About us
</Link>;
```

<br/>

#### 2.How do use Role-Based Guard?

```js
import RoleBasedGuard from '../guards/RoleBasedGuard';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: 'calendar',
      element: (
        <RoleBasedGuard accessibleRoles={['admin']}>
          <Calendar />
        </RoleBasedGuard>
      )
    }
  ]);
}
```

<br/>

#### 3.How to set the index page?

```js
import RoleBasedGuard from '../guards/RoleBasedGuard';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      )
    }
  ]);
}
```

<br/>

#### 4.How to set default page displayed after login?

```js
// src/guards/GuestGuard.js

if (isAuthenticated) {
  return <Navigate to="/dashboard/calendar" />;
}
```
