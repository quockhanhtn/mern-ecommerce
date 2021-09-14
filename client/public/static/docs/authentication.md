---
title: Authentication
---

## Authentication

Minimal project that supports authentication methods:

- JWT
- Aws Cognito
- Auth0
- Firebase

---

#### 1.Method JWT

```js
//  file `src/index.js`

import { AuthProvider } from './contexts/JWTContext';

<AuthProvider>
  <App />
</AuthProvider>;

// ----------------------------------------------------------------------

// file `src/hooks/useAuth.js`

import { useContext } from 'react';
import { AuthContext } from '../contexts/JWTContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
```

<br/>

#### 2.Method Aws Cognito

```js
//  file `src/index.js`

import { AuthProvider } from './contexts/AwsCognitoContext';

<AuthProvider>
  <App />
</AuthProvider>;

// ----------------------------------------------------------------------

// file `src/hooks/useAuth.js`

import { useContext } from 'react';
import { AuthContext } from '../contexts/AwsCognitoContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
```

##### Setup Aws Cognito

[https://www.youtube.com/watch?v=-qo5GFdN-Ck&list=WL&index=22&t=344s](https://www.youtube.com/watch?v=-qo5GFdN-Ck&list=WL&index=22&t=344s)

<br/>

#### 3.Method Auth0

```js
//  file `src/index.js`

import { AuthProvider } from './contexts/Auth0Context';

<AuthProvider>
  <App />
</AuthProvider>;

// ----------------------------------------------------------------------

// file `src/hooks/useAuth.js`

import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth0Context';

const useAuth = () => useContext(AuthContext);

export default useAuth;
```

<br/>

#### 4.Method Firebase

```js
// file `src/index.js`

import { AuthProvider } from './contexts/FirebaseContext';

<AuthProvider>
  <App />
</AuthProvider>;

// ----------------------------------------------------------------------

// file `src/hooks/useAuth.js`

import { useContext } from 'react';
import { AuthContext } from '../contexts/FirebaseContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
```

##### Setup Firebase (Login email/ password)

- Create an account [https://firebase.google.com/docs/auth](https://firebase.google.com/docs/auth)
- Get information and enable `Email/Password` here:

![img](/static/docs/assets/firebase_1.jpg)
![img](/static/docs/assets/firebase_1.jpg)

- Fill infomation in `.env`

```js
# FIREBASE
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APPID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

##### Login with Facebook (firebase)

[https://www.youtube.com/watch?v=X_twiDVZ4PY](https://www.youtube.com/watch?v=X_twiDVZ4PY)

##### Login with Twitter (firebase)

[https://www.youtube.com/watch?v=7Uo5dsu1KK4](https://www.youtube.com/watch?v=7Uo5dsu1KK4)
