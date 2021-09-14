---
title: Tips
---

## Tips

##### A few points to tips on the project.

---

#### Import from Material-UI

Because we follow [minimizing bundle size](https://next.material-ui.com/guides/minimizing-bundle-size/) to optimize load performance,
we need to strictly adhere to the following when importing:

🟢 OK

```js
import { alpha, makeStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { Button, AppBar, Hidden, Toolbar, IconButton } from '@material-ui/core';
```

🔴 NOT OK (Would include all of `@material-ui/core`)

```js
import {
  alpha,
  Button,
  AppBar,
  Hidden,
  Toolbar,
  capitalize
  makeStyles,
  IconButton,
} from '@material-ui/core';
```

<br/>

#### Similar to Lodash

🟢 OK

```js
import { merge, makeStyles } from 'lodash';

merge(object, other);
```

🔴 NOT OK (Do not should include all in `lodash`)

```js
import _ from 'lodash';

_.merge(object, other);
```

<br/>

#### Auto reload when save changes

If you are on `react-scripts` 4.x or higher it will not refresh the page automatically every time you save changes instead a quick refresh.

There are 2 ways to fix this problem:

1.Downgrade to the nearest version "react-scripts": "3.4.4"

2.Add line the `.env` FAST_REFRESH = false

Lear more:

- [https://github.com/facebook/create-react-app/issues/9984](https://github.com/facebook/create-react-app/issues/9984)
- [https://github.com/facebook/create-react-app/issues/9904](https://github.com/facebook/create-react-app/issues/9904)

---
