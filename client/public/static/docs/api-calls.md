---
title: API Calls
---

## API Calls

Two packages to call APIs are [axios](https://www.npmjs.com/package/axios) and [fetch](https://www.npmjs.com/package/fetch). In this project we use axios.

---

#### Example

```js
import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

function ProductDetails() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [product, setProduct] = useState([]);

  const getProduct = useCallback(async () => {
    try {
      const response = await axios.get('/api/product', {
        params: { productId }
      });
      if (isMountedRef.current) {
        setProduct(response.data.product);
      }
    } catch (err) {
      //
    }
  }, [isMountedRef]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return <div>{product.name}</div>;
}
```

<br/>

#### Add fake data from axios-mock-adapter

[axios-ock-adapter](https://github.com/ctimmerm/axios-mock-adapter#readme) allows to easily mock requests.

```js
import faker from 'faker';
import mock from 'src/utils/mock';

// ----------------------------------------------------------------------

let posts = [...Array(8)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: `0feb2990-4210-4170-93a4-37e8f5958a18-${setIndex}`,
    cover: `/static/images/blog/cover_${setIndex}.jpg`,
    title: POST_TITLES[setIndex],
    description: faker.lorem.paragraph()
  };
});

mock.onGet('/api/blog/posts/all').reply(200, { posts });
```

<br/>

#### Call API from external server

Learn more: [axios](https://www.npmjs.com/package/axios)

Disabled fake API call from `src/index.js`

```js
// import './_apis_';
```

Set default path

```js
const axiosInstance = axios.create({
  baseURL: 'https://your-domain.com/api/'
});
```
