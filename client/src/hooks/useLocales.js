import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'vi',
    label: 'Tiếng Việt',
    icon: '/static/icons/ic_flag_vn.svg',
    isAvailable: true
  },
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/ic_flag_en.svg',
    isAvailable: true
  },
  {
    value: 'de',
    label: 'German',
    icon: '/static/icons/ic_flag_de.svg',
    isAvailable: false
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/static/icons/ic_flag_fr.svg',
    isAvailable: false
  },
  {
    value: 'kr',
    label: '한국인',
    icon: '/static/icons/ic_flag_kr.svg',
    isAvailable: false
  }
];

// ----------------------------------------------------------------------

export default function useLocales() {
  const { i18n, t } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage);

  const handleChangeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    t,
    currentLang,
    allLang: LANGS
  };
}
