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
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useEffect, useState } from 'react';
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../../../components/Page';
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import useLocales from '../../../hooks/useLocales';
import LoadingScreen from '../../../components/LoadingScreen';
import { deleteProduct, getAllProducts } from '../../../actions/products';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import * as Helper from '../../../helper/listHelper';
import SearchNotFound from '../../../components/SearchNotFound';
import { ProductListHead, ProductListToolbar, ProductMoreMenu } from '../../../components/dashboard/products';
import { ImageBrokenIcon } from '../../../assets';
import EmptyCard from '../../../components/EmptyCard';
// ----------------------------------------------------------------------
const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2, 0, 0),
  borderRadius: theme.shape.borderRadiusSm
}));
// ----------------------------------------------------------------------

export default function PageProductList() {
  const { t } = useLocales();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { list: productsList, isLoading, hasError } = useSelector((state) => state.product);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const tableHeads = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: t('dashboard.products.name')
    },
    {
      id: 'brand',
      numeric: false,
      disablePadding: false,
      label: t('dashboard.products.brand')
    },
    {
      id: 'category',
      numeric: false,
      disablePadding: false,
      label: t('dashboard.products.category')
    },
    {
      id: 'origin',
      numeric: false,
      disablePadding: false,
      label: t('dashboard.products.origin')
    },
    {
      id: 'warrantyPeriod',
      numeric: false,
      disablePadding: false,
      label: t('dashboard.products.warrantyPeriod')
    },
    {
      id: 'isHide',
      numeric: false,
      disablePadding: false,
      label: t('dashboard.products.status')
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: false
    }
  ];

  const handleDeleteProduct = (id, slug) => {
    try {
      dispatch(deleteProduct(id));
      enqueueSnackbar(t('dashboard.products.delete'), { variant: 'success' });
      const index = selected.indexOf(slug);
      selected.splice(index, 1);
    } catch (e) {
      enqueueSnackbar(t('dashboard.products.error'), { variant: 'error' });
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setIsCompact(event.target.checked);
  };

  const isSelected = (slug) => selected.indexOf(slug) !== -1;

  // Avoid a layout jump when reaching the last page with empty productsList.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productsList.length) : 0;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (hasError) {
    return <SearchNotFound />;
  }

  return (
    <Page title={t('dashboard.products.page-title')}>
      <Container>
        <HeaderBreadcrumbs
          heading={t('dashboard.products.heading')}
          links={[
            { name: t('dashboard.title'), href: PATH_DASHBOARD.root },
            {
              name: t('dashboard.management'),
              href: PATH_DASHBOARD.app.root
            },
            { name: t('dashboard.products.heading') }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.app.products.add}
              startIcon={<Icon icon={plusFill} />}
            >
              New Product
            </Button>
          }
        />
        {productsList.length > 0 ? (
          <Card>
            <ProductListToolbar numSelected={selected.length} />
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table size={isCompact ? 'small' : 'medium'}>
                  <ProductListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={tableHeads}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    rowCount={productsList.length}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {Helper.stableSort(productsList, Helper.getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const { _id, slug, name, brand, category, origin, warrantyPeriod, isHide } = row;
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
                                  {thumbnail ? (
                                    <ThumbImgStyle alt={name} src={thumbnail} />
                                  ) : (
                                    <ImageBrokenIcon width={64} height={64} marginRight={2} />
                                  )}
                                  <Typography variant="subtitle2" noWrap>
                                    {name}
                                  </Typography>
                                </Box>
                              </TableCell>
                            )}
                            <TableCell align="left" style={{ minWidth: 100 }}>
                              <Typography variant="subtitle4" noWrap>
                                {brand?.name}
                              </Typography>
                            </TableCell>
                            <TableCell align="left" style={{ minWidth: 100 }}>
                              <Typography variant="subtitle4" noWrap>
                                {category?.name}
                              </Typography>
                            </TableCell>
                            <TableCell align="left" style={{ minWidth: 100 }}>
                              {origin}
                            </TableCell>
                            <TableCell align="left" style={{ minWidth: 100 }}>
                              {warrantyPeriod}
                            </TableCell>
                            <TableCell align="left">
                              <Label
                                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                color={isHide ? 'default' : 'success'}
                              >
                                {t(`dashboard.products.${isHide ? 'hidden' : 'visible'}`)}
                              </Label>
                            </TableCell>
                            <TableCell align="right" onClick={(event) => event.stopPropagation()}>
                              <ProductMoreMenu
                                onDelete={() => handleDeleteProduct(_id, slug)}
                                productId={_id}
                                nameInfo={name}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: (isCompact ? 33 : 53) * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <Box sx={{ position: 'relative' }}>
              <TablePagination
                labelRowsPerPage={t('common.rows-per-page')}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={productsList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <Box
                sx={{
                  px: 3,
                  py: 1.5,
                  top: 0,
                  position: { md: 'absolute' }
                }}
              >
                <FormControlLabel
                  control={<Switch checked={isCompact} onChange={handleChangeDense} />}
                  label={t('common.small-padding')}
                />
              </Box>
            </Box>
          </Card>
        ) : (
          <EmptyCard title={t('dashboard.products.title-not-found')} />
        )}
      </Container>
    </Page>
  );
}
