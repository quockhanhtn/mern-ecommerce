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
    <Page title={t('products.add-title')}>
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={t('products.heading-create')}
          links={[
            { name: t('dashboard.title'), href: PATH_DASHBOARD.root },
            {
              name: t('dashboard.management'),
              href: PATH_DASHBOARD.app.root
            },
            {
              name: t('products.heading'),
              href: PATH_DASHBOARD.app.products.list
            },
            { name: t('products.add') }
          ]}
        />
        <ProductForm />
      </Container>
    </Page>
  );
}
