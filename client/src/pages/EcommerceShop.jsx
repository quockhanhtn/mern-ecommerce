import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { filter, includes, orderBy } from 'lodash';
// material
import { Backdrop, Container, Typography, CircularProgress, Stack } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from 'react-redux';
// components
import Page from '../components/Page';
import {
  CartWidget,
  ShopFilterSidebar,
  ShopProductList,
  ShopProductSort,
  ShopTagFiltered
} from '../components/dashboard/e-commerce';
import { getAllProducts } from '../actions/products';

// ----------------------------------------------------------------------

function applyFilter(products, sortBy, filters) {
  // SORT BY
  if (sortBy === 'featured') {
    products = orderBy(products, ['sold'], ['desc']);
  }
  if (sortBy === 'newest') {
    products = orderBy(products, ['createdAt'], ['desc']);
  }
  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['price'], ['desc']);
  }
  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['price'], ['asc']);
  }
  // FILTER PRODUCTS
  // if (filters.gender.length > 0) {
  //   products = filter(products, (_product) => includes(filters.gender, _product.gender));
  // }
  // if (filters.category !== 'All') {
  //   products = filter(products, (_product) => _product.category === filters.category);
  // }
  // if (filters.colors.length > 0) {
  //   products = filter(products, (_product) => _product.colors.some((color) => filters.colors.includes(color)));
  // }
  // if (filters.priceRange) {
  //   products = filter(products, (_product) => {
  //     if (filters.priceRange === 'below') {
  //       return _product.price < 25;
  //     }
  //     if (filters.priceRange === 'between') {
  //       return _product.price >= 25 && _product.price <= 75;
  //     }
  //     return _product.price > 75;
  //   });
  // }
  // if (filters.rating) {
  //   products = filter(products, (_product) => {
  //     const convertRating = (value) => {
  //       if (value === 'up4Star') return 4;
  //       if (value === 'up3Star') return 3;
  //       if (value === 'up2Star') return 2;
  //       return 1;
  //     };
  //     return _product.totalRating > convertRating(filters.rating);
  //   });
  // }
  return products;
}

export default function EcommerceShop() {
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const { list: products, sortBy, filters } = useSelector((state) => state.product);
  const filteredProducts = applyFilter(products, sortBy, filters);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // await fakeRequest(500);
        // setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { values, resetForm, handleSubmit, isSubmitting, initialValues } = formik;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    // dispatch(filterProducts(values));
  }, [dispatch, values]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="Ecommerce: Shop | Minimal-UI">
      {values && (
        <Backdrop open={isSubmitting} sx={{ zIndex: 9999 }}>
          <CircularProgress />
        </Backdrop>
      )}

      <Container>
        {values !== initialValues && (
          <Typography gutterBottom>
            <Typography component="span" variant="subtitle1">
              {filteredProducts.length}
            </Typography>
            &nbsp;Products found
          </Typography>
        )}

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          {/* <ShopTagFiltered */}
          {/*  filters={filters} */}
          {/*  formik={formik} */}
          {/*  isShowReset={openFilter} */}
          {/*  onResetFilter={handleResetFilter} */}
          {/* /> */}

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {/* <ShopFilterSidebar */}
            {/*  formik={formik} */}
            {/*  isOpenFilter={openFilter} */}
            {/*  onResetFilter={handleResetFilter} */}
            {/*  onOpenFilter={handleOpenFilter} */}
            {/*  onCloseFilter={handleCloseFilter} */}
            {/* /> */}
            {/* <ShopProductSort /> */}
          </Stack>
        </Stack>

        <ShopProductList products={products} isLoad={!filteredProducts && !initialValues} />
        <CartWidget />
      </Container>
    </Page>
  );
}