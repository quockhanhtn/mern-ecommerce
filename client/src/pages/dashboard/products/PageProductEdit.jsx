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

// ----------------------------------------------------------------------

export default function PageProductEdit() {
  return (
    <Page title="Ecommerce: Edit product">
      <Container>
        <HeaderBreadcrumbs
          heading="Edit product"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Product list',
              href: PATH_DASHBOARD.app.products.list
            },
            { name: 'Edit product' }
          ]}
        />
        <ProductFormEdit />
        <ProductVariant />
      </Container>
    </Page>
  );
}
