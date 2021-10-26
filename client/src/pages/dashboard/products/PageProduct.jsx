import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
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

export default function EcommerceProductCreate() {
  return (
    <Page title="Ecommerce: Create a new product | Minimal-UI">
      <Container>
        <HeaderBreadcrumbs
          heading="Create a new product"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Product list',
              href: PATH_DASHBOARD.app.products
            },
            { name: 'New product' }
          ]}
        />
        <ProductForm />
      </Container>
    </Page>
  );
}
