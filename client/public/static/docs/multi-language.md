---
title: Multi Language
---

## Multi Language

#### [Demo](https://minimals.cc/components/multi-language)

---

#### 1.Add content

- in folder `src/locales/en.json`

```json
{
  "heading": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  "nested": {
    "nested1": "nested En"
  }
}
```

- in folder `src/locales/fr.json`

```json
{
  "heading": "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression",
  "nested": {
    "nested1": "nested Fr"
  }
}
```

<br/>

#### 2.Usage

```js
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

function MultiLanguage() {
  const { allLang, currentLang, translate, onChangeLang } = useLocales();

  return (
    <>
      <RadioGroup row value={currentLang.value} onChange={(event) => onChangeLang(event.target.value)}>
        {allLang.map((lang) => (
          <FormControlLabel key={lang.label} value={lang.value} label={lang.label} control={<Radio />} />
        ))}
      </RadioGroup>

      <Typography variant="h2">{translate('heading')}</Typography>
      <Typography variant="body2">{translate('nested.nested1')}</Typography>
    </>
  );
}
```
