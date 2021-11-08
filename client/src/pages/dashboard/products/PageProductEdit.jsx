// material
import { Container } from '@material-ui/core';
// redux
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ProductFormEdit from './ProductFormEdit';
import ProductVariant from './ProductVariant';
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

export default function PageProductEdit() {
  const { t } = useLocales();
  return (
    <Page title={t('dashboard.products.edit-title')}>
      <Container>
        <HeaderBreadcrumbs
          heading={t('dashboard.products.edit')}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: t('dashboard.products.heading'),
              href: PATH_DASHBOARD.app.products.list
            },
            { name: t('dashboard.products.edit') }
          ]}
        />
        <ProductFormEdit />
        <ProductVariant />
      </Container>
    </Page>
  );
}
