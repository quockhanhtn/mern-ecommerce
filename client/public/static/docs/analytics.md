---
title: Analytics
---

## Analytics

---

#### 1.Get google analytics ID

- Create a [Google account](https://marketingplatform.google.com/about/analytics/)
- Find your [Google analytics](https://support.google.com/analytics/answer/1008080?hl=en) ID.
- Copy Tracking code ID to `.env`(example: REACT_APP_GA_MEASUREMENT_ID=UA-16061xxxx-1)

<br/>

#### 2.Tracking

**A.Tracking Page Views**

```js
import { useLocation } from 'react-router-dom';
import track from 'src/utils/analytics';

// ----------------------------------------------------------------------

function PageExample() {
  const { pathname } = useLocation();

  useEffect(() => {
    track.pageView({
      page_path: pathname
    });
  }, []);

  return <div>Page Content</div>;
}
```

<br/>

**B.Tracking Page Actions**

```js
import track from 'src/utils/analytics';

// ----------------------------------------------------------------------

function Shop() {
  const handleAddtoCart = () => {
    track.event('add_to_cart');
    // Some Actions
  };

  return (
    <div>
      Product
      <Button onClick={handleAddtoCart}>Add to Cart</Button>
    </div>
  );
}
```
