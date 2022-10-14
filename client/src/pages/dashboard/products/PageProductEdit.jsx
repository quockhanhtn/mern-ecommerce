// material
import { Container } from '@mui/material';
// redux
// routes
import { PATH_DASHBOARD } from '~/routes/paths';
// components
import useLocales from '~/hooks/useLocales';
import Page from '~/components/Page';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
import ProductFormEdit from './ProductFormEdit';
import ProductVariant from './ProductVariant';

// ----------------------------------------------------------------------

export default function PageProductEdit() {
  const { t } = useLocales();
  return (
    <Page title={t('products.edit-title')}>
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={t('products.edit')}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: t('products.heading'),
              href: PATH_DASHBOARD.app.products.list
            },
            { name: t('products.edit') }
          ]}
        />
        <ProductFormEdit />
        <ProductVariant />
      </Container>
    </Page>
  );
}
