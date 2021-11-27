import { Container } from '@material-ui/core';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ProductForm from './ProductForm';
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

export default function PageProduct() {
  const { t } = useLocales();
  return (
    <Page title={t('dashboard.products.add-title')}>
      <Container>
        <HeaderBreadcrumbs
          heading={t('dashboard.products.heading-create')}
          links={[
            { name: t('dashboard.title'), href: PATH_DASHBOARD.root },
            {
              name: t('dashboard.management'),
              href: PATH_DASHBOARD.app.root
            },
            {
              name: t('dashboard.products.heading'),
              href: PATH_DASHBOARD.app.products.list
            },
            { name: t('dashboard.products.add') }
          ]}
        />
        <ProductForm />
      </Container>
    </Page>
  );
}
