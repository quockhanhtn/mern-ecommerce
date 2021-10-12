import i18next from 'i18next';
import React from 'react';

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        demo: 'Test for demo'
      }
    }
  }
});

export function t(key, params) {
  if (params) {
    return i18next.t(key, params);
  }
  return i18next.t(key);
}

export const brand = (
  <span>
    <span className="brand_name">{t('brand_name')}</span>
  </span>
);
