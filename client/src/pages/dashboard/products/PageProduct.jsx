import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '~/routes/paths';
// components
import useLocales from '~/hooks/useLocales';
import Page from '~/components/Page';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
import ProductForm from './ProductForm';

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
