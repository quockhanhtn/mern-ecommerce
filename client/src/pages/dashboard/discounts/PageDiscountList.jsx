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
import Page from '../../../components/Page';
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import useLocales from '../../../hooks/useLocales';
import LoadingScreen from '../../../components/LoadingScreen';
import Label from '../../../components/Label';
import { fDateTime } from '../../../utils/formatTime';
import Scrollbar from '../../../components/Scrollbar';
import * as Helper from '../../../helper/listHelper';
import { DiscountListToolbar, DiscountListHead, DiscountMoreMenu } from '../../../components/dashboard/discount-list';
import { deleteDiscount, getAllDiscounts } from '../../../actions/discounts';
import DiscountForm from './DiscountForm';
import EmptyCard from '../../../components/EmptyCard';
import SearchNotFound from '../../../components/SearchNotFound';
import { ImageBrokenIcon } from '../../../assets';
// ----------------------------------------------------------------------
const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2, 0, 0),
  borderRadius: theme.shape.borderRadiusSm
}));

export default function PageDiscountList() {
  const { t } = useLocales();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { list: discountsList, isLoading, hasError } = useSelector((state) => state.discount);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentId, setCurrentId] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    dispatch(getAllDiscounts());
  }, [dispatch]);

  const tableHeads = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: t('dashboard.discounts.name')
    },
    {
      id: 'code',
      numeric: false,
      disablePadding: true,
      label: t('dashboard.discounts.code')
    },
    {
      id: 'quantity',
      numeric: false,
      disablePadding: true,
      label: t('dashboard.discounts.quantity')
    },
    {
      id: 'discount',
      numeric: false,
      disablePadding: true,
      label: t('dashboard.discounts.discount')
    },
    {
      id: 'isHide',
      numeric: false,
      disablePadding: false,
      label: t('dashboard.discounts.status')
    },
    {
      id: 'fromDate',
      numeric: true,
      disablePadding: false,
      label: t('dashboard.discounts.date-start')
    },
    {
      id: 'endDate',
      numeric: true,
      disablePadding: false,
      label: t('dashboard.discounts.date-end')
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: false
    }
  ];

  const handleDeleteDiscount = async (id, slug) => {
    await dispatch(deleteDiscount(id));
    dispatch(getAllDiscounts());
    enqueueSnackbar(t('dashboard.brands.delete'), { variant: 'success' });
    const index = selected.indexOf(slug);
    selected.splice(index, 1);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = discountsList.map((n) => n.slug);
      setSelected(newSelected);
      if (selected.count === 1) {
        setCurrentId(discountsList[discountsList.indexOf(selected[0])]._id);
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
    setDense(event.target.checked);
  };

  const handleCreateNew = () => {
    setCurrentId(null);
    setOpenForm(true);
  };

  const handleEditBrand = (brandId) => {
    setCurrentId(brandId);
    setOpenForm(true);
  };

  const isSelected = (slug) => selected.indexOf(slug) !== -1;

  // Avoid a layout jump when reaching the last page with empty discounts.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - discountsList.length) : 0;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (hasError) {
    return <SearchNotFound />;
  }

  return (
    <Page title={t('dashboard.discounts.title-page')}>
      <Container>
        {openForm && <DiscountForm open={openForm} setOpen={setOpenForm} currentId={currentId} />}
        <HeaderBreadcrumbs
          heading={t('dashboard.discounts.heading')}
          links={[
            { name: t('dashboard.title'), href: PATH_DASHBOARD.root },
            {
              name: t('dashboard.ecommerce'),
              href: PATH_DASHBOARD.root
            },
            { name: t('dashboard.discounts.heading') }
          ]}
          action={
            <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleCreateNew}>
              {t('dashboard.discounts.add')}
            </Button>
          }
        />
        {discountsList.length > 0 ? (
          <Card>
            <DiscountListToolbar numSelected={selected.length} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table size={dense ? 'small' : 'medium'}>
                  <DiscountListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={tableHeads}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    rowCount={discountsList.length}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {Helper.stableSort(discountsList, Helper.getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const { _id, slug, name, code, discount, quantity, image, fromDate, endDate, isHide } = row;
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
                            {dense ? (
                              <TableCell component="th" id={labelId} scope="row" padding="none">
                                {name}
                              </TableCell>
                            ) : (
                              <TableCell component="th" scope="row" padding="none">
                                <Box sx={{ py: 2, display: 'flex', alignItems: 'center' }}>
                                  {image ? (
                                    <ThumbImgStyle alt={name} src={image} />
                                  ) : (
                                    <ImageBrokenIcon width={64} height={64} marginRight={2} />
                                  )}
                                  <Typography variant="subtitle2" noWrap>
                                    {name}
                                  </Typography>
                                </Box>
                              </TableCell>
                            )}
                            <TableCell align="left" style={{ minWidth: 40 }}>
                              <Typography variant="subtitle4" noWrap>
                                {code.toUpperCase()}
                              </Typography>
                            </TableCell>
                            <TableCell align="left" style={{ minWidth: 40 }}>
                              <Typography variant="subtitle4" noWrap>
                                {quantity}
                              </Typography>
                            </TableCell>
                            <TableCell align="left" style={{ minWidth: 40 }}>
                              <Typography variant="subtitle4" noWrap>
                                {discount}%
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Label
                                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                color={isHide ? 'default' : 'success'}
                              >
                                {t(`dashboard.brands.${isHide ? 'hidden' : 'visible'}`)}
                              </Label>
                            </TableCell>
                            <TableCell align="right" style={{ minWidth: 160 }}>
                              {fDateTime(fromDate)}
                            </TableCell>
                            <TableCell align="right" style={{ minWidth: 160 }}>
                              {fDateTime(endDate)}
                            </TableCell>
                            <TableCell align="right" onClick={(event) => event.stopPropagation()}>
                              <DiscountMoreMenu
                                onEdit={() => handleEditBrand(_id)}
                                onDelete={() => handleDeleteDiscount(_id, slug)}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
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
                count={discountsList.length}
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
                  control={<Switch checked={dense} onChange={handleChangeDense} />}
                  label={t('common.small-padding')}
                />
              </Box>
            </Box>
          </Card>
        ) : (
          <EmptyCard title={t('dashboard.discounts.title-not-found')} />
        )}
      </Container>
    </Page>
  );
}
