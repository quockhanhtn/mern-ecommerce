// icons
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material-ui
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
//
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
//
import { useLocales } from '../../../hooks';
import { PATH_DASHBOARD } from '../../../routes/paths';

import { ThumbImgStyle } from '../../../components/@styled';
import { ProductMoreMenu, ProductTableToolbar } from '../../../components/dashboard/products';
import EmptyCard from '../../../components/EmptyCard';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Label from '../../../components/Label';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { deleteProduct, getProductDashboard, toggleHideProduct } from '../../../redux/slices/productSlice';

import { MCircularProgress } from '../../../components/@material-extend';
import { MTableHead } from '../../../components/@material-extend/table';

import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

export default function PageProductList() {
  const { t, currentLang } = useLocales();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [isCompact, setIsCompact] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const { list: productsList, isLoading, hasError, pagination } = useSelector((state) => state.product.dashboard);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState('desc');
  const [sortBy, setSortBy] = useState('createdAt');

  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [showHidden, setShowHidden] = useState(false);

  useEffect(() => {
    dispatch(getProductDashboard(search, page, rowsPerPage, sort, sortBy, categoryFilter, brandFilter, showHidden));
  }, [dispatch, page, rowsPerPage, search, sort, sortBy, categoryFilter, brandFilter, showHidden]);

  const tableHeads = [
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: t('products.name')
    },
    {
      id: 'brand',
      disablePadding: true,
      label: t('products.brand')
    },
    {
      id: 'category',
      disablePadding: true,
      label: t('products.category')
    },
    {
      id: 'isHide',
      disablePadding: true,
      label: t('products.status')
    },
    {
      id: 'createdAt',
      align: 'right',
      disablePadding: true,
      label: t('dashboard.created-at')
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: false
    }
  ];

  const handleChangeProductHide = (id) => {
    dispatch(toggleHideProduct(id));
  };

  const handleDeleteProduct = (id, slug) => {
    try {
      dispatch(deleteProduct(id));
      enqueueSnackbar(t('products.delete'), { variant: 'success' });
      const index = selected.indexOf(slug);
      selected.splice(index, 1);
    } catch (e) {
      enqueueSnackbar(t('products.error'), { variant: 'error' });
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = sortBy === property && sort === 'asc';
    setSort(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = productsList.map((n) => n.slug);
      setSelected(newSelected);
      if (selected.count === 1) {
        setCurrentId(productsList[productsList.indexOf(selected[0])]._id);
      }
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, slug) => {
    const selectedIndex = selected.indexOf(slug);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, slug);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleChangeDense = (event) => {
    setIsCompact(event.target.checked);
  };

  const isSelected = (slug) => selected.indexOf(slug) !== -1;

  // Avoid a layout jump when reaching the last page with empty productsList.
  const emptyRows =
    page > 0 ? Math.min(rowsPerPage - productsList.length, (1 + page) * rowsPerPage - pagination?.total) : 0;

  if (hasError) {
    return <SearchNotFound />;
  }

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={tableHeads.length + 1}>
              <Box height={200} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MCircularProgress size={100} />
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    if (productsList?.length > 0) {
      return (
        <TableBody>
          {productsList.map((row, index) => {
            const { _id, slug, name, brand, category, isHide, createdAt } = row;
            const thumbnail = row?.variants[0]?.thumbnail;
            const isItemSelected = isSelected(slug);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={_id}
                selected={isItemSelected}
                onClick={(event) => handleClick(event, slug)}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isItemSelected} />
                </TableCell>
                {isCompact ? (
                  <TableCell component="th" id={labelId} scope="row" padding="normal">
                    {name}
                  </TableCell>
                ) : (
                  <TableCell component="th" scope="row" padding="none">
                    <Box sx={{ py: 2, display: 'flex', alignItems: 'center' }}>
                      <ThumbImgStyle alt={name} src={thumbnail} objectFit="contain" isSelected={isItemSelected} />

                      <Typography variant="subtitle2" noWrap>
                        {name}
                      </Typography>
                    </Box>
                  </TableCell>
                )}
                <TableCell align="left" padding="none">
                  <Typography variant="subtitle4" noWrap>
                    {brand?.name ?? '<trống>'}
                  </Typography>
                </TableCell>
                <TableCell align="left" padding="none">
                  <Typography variant="subtitle4" noWrap>
                    {category?.name ?? '<chưa phân loại>'}
                  </Typography>
                </TableCell>
                <TableCell align="left" padding="none">
                  <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={isHide ? 'default' : 'success'}
                  >
                    {t(`products.${isHide ? 'hidden' : 'visible'}`)}
                  </Label>
                </TableCell>
                <TableCell align="right" padding="none" style={{ width: 175 }}>
                  {fDateTime(createdAt, currentLang.value)}
                </TableCell>
                <TableCell align="right" onClick={(event) => event.stopPropagation()}>
                  <ProductMoreMenu
                    onDelete={() => handleDeleteProduct(_id, slug)}
                    onChangeHide={handleChangeProductHide}
                    productId={_id}
                    productName={name}
                    isHide={isHide}
                  />
                </TableCell>
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: (isCompact ? 33 : 53) * emptyRows }}>
              <TableCell colSpan={tableHeads.length + 1} />
            </TableRow>
          )}
        </TableBody>
      );
    }
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={tableHeads.length + 1}>
            <EmptyCard title={search ? 'Không tìm thấy sản phẩm' : t('products.title-not-found')} />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  };

  return (
    <Page title={t('products.page-title')}>
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={t('products.heading')}
          links={[
            { name: t('dashboard.title'), href: PATH_DASHBOARD.root },
            {
              name: t('dashboard.management'),
              href: PATH_DASHBOARD.app.root
            },
            { name: t('products.heading') }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.app.products.add}
              startIcon={<Icon icon={plusFill} />}
            >
              {t('products.add')}
            </Button>
          }
        />
        <Card>
          <ProductTableToolbar
            searchPlaceHolder={t('products.search-product-placeholder')}
            numSelected={selected.length}
            initialValue={search}
            onSearch={(e, search) => setSearch(search)}
            onCategoryChange={(newValue) => setCategoryFilter(newValue)}
            onBrandChange={(newValue) => setBrandFilter(newValue)}
            onChangeShowHidden={(newValue) => setShowHidden(newValue)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size={isCompact ? 'small' : 'medium'}>
                <MTableHead
                  order={sort}
                  orderBy={sortBy}
                  headLabel={tableHeads}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  rowCount={productsList.length}
                  onSelectAllClick={handleSelectAllClick}
                />
                {renderTableBody()}
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              labelRowsPerPage={t('common.rows-per-page')}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={pagination.total}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Box sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}>
              <FormControlLabel
                control={<Switch checked={isCompact} onChange={handleChangeDense} />}
                label={t('common.small-padding')}
              />
            </Box>
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
