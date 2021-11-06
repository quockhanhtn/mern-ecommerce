// material
import { Container } from '@material-ui/core';
// redux
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ProductForm from './ProductForm';

// ----------------------------------------------------------------------

export default function PageProduct() {
  return (
    <Page title="Ecommerce: Create a new product">
      <Container>
        <HeaderBreadcrumbs
          heading="Create a new product"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Product list',
              href: PATH_DASHBOARD.app.products.list
            },
            { name: 'New product' }
          ]}
        />
        <ProductForm />
      </Container>
    </Page>
  );
}
