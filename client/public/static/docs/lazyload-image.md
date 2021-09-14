---
title: Lazyload
---

## Lazyload

---

#### 1.Simple

```js
import LazySize from 'src/components/LazySize';

<LazySize alt="attachment" src="hero_img_size_600.jpg" />;
```

<br/>

#### 2.With Autosize

```js
const BASE_IMG = 'https://res.cloudinary.com/cloud_name/image/upload/c_scale,f_auto,q_auto,';

const getImg = (width) => `${BASE_IMG}w_${width}/v1611472901/upload_minimal/home/hero.png`;

function Card() {
  return <LazySize alt="hero" src={getImg(600)} size={`${getImg(1200)} 600w, ${getImg(1600)} 960w`} />;
}
```

Or

```js
const img_600 = 'hero_img_size_600.jpg';
const img_1200 = 'hero_img_size_1200.jpg';
const img_1600 = 'hero_img_size_1600.jpg';

function Card() {
  return <LazySize alt="hero" src={img_600} size={`${img_1200} 600w, ${img_1600} 960w`} />;
}
```

<br/>

#### 3.Option

```js
function Card() {
  return <LazySize disabledBlur hidePlaceholder alt="hero" src={img_600} size={`${img_1200} 600w, ${img_1600} 960w`} />;
}
```
