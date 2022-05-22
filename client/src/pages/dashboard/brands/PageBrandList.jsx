import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
//
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
  Tooltip,
  Typography
} from '@material-ui/core';
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
//
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
//
import Page from '../../../components/Page';
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import useLocales from '../../../hooks/useLocales';
import LoadingScreen from '../../../components/LoadingScreen';
import { deleteBrand, getAllBrands } from '../../../redux/slices/brandSlice';
import Label from '../../../components/Label';
import { fDateTime } from '../../../utils/formatTime';
import Scrollbar from '../../../components/Scrollbar';
import { getComparator, stableSort } from '../../../helper/listHelper';
import BrandForm from './BrandForm';
import { BrandListHead, BrandListToolbar, BrandMoreMenu } from '../../../components/dashboard/brand-list';
import { ImageBrokenIcon } from '../../../assets';
import EmptyCard from '../../../components/EmptyCard';

// ----------------------------------------------------------------------

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 150,
  height: 64,
  objectFit: 'contain',
  margin: theme.spacing(0, 2, 0, 0),
  borderRadius: theme.shape.borderRadiusSm
}));

export default function PageBrandList() {
  const { t, currentLang } = useLocales();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { list: brandsList, isLoading, error, deletedIds } = useSelector((state) => state.brand);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentId, setCurrentId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const mgs = error?.message?.[currentLang.value] || 'Có lỗi xảy ra !';
      enqueueSnackbar(mgs, { variant: 'error' });
    }
    if (deletedIds && deletedIds.some((x) => x === deletingId)) {
      enqueueSnackbar('Xóa thương hiệu thành công', { variant: 'success' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, deletedIds]);

  const tableHeads = [
    {
      id: 'name',
      align: 'left',
      disablePadding: true,
      label: `${t('dashboard.brands.name')}\t\t\t`
    },
    {
      id: 'country',
      disablePadding: true,
      label: t('dashboard.brands.country')
    },
    {
      id: 'isHide',
      disablePadding: false,
      label: t('dashboard.brands.status')
    },
    {
      id: 'createdAt',
      align: 'right',
      disablePadding: false,
      label: t('dashboard.created-at')
    },
    {
      id: 'updatedAt',
      align: 'right',
      disablePadding: false,
      label: t('dashboard.updated-at')
    },
    {
      id: 'action',
      align: 'right',
      disablePadding: false
    }
  ];

  const handleDeleteBrand = (id, slug) => {
    setDeletingId(id);
    dispatch(deleteBrand(id));
    const selectedIndex = selected.indexOf(slug);
    if (selectedIndex > -1) {
      selected.splice(selectedIndex, 1);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = brandsList.map((n) => n.slug);
      setSelected(newSelected);
      if (selected.count === 1) {
        setCurrentId(brandsList[brandsList.indexOf(selected[0])]._id);
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

  const handleCreateNew = () => {
    setCurrentId(null);
    setOpenForm(true);
  };

  const handleEditBrand = (brandId) => {
    setCurrentId(brandId);
    setOpenForm(true);
  };

  const isSelected = (slug) => selected.indexOf(slug) !== -1;

  // Avoid a layout jump when reaching the last page with empty brandsList.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - brandsList.length) : 0;

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page title={t('dashboard.brands.page-title')}>
      <Container maxWidth={false}>
        {openForm && <BrandForm open={openForm} setOpen={setOpenForm} currentId={currentId} />}
        <HeaderBreadcrumbs
          heading={t('dashboard.brands.heading')}
          links={[
            { name: t('dashboard.title'), href: PATH_DASHBOARD.root },
            {
              name: t('dashboard.management'),
              href: PATH_DASHBOARD.app.root
            },
            { name: t('dashboard.brands.heading') }
          ]}
          action={
            <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleCreateNew}>
              {t('dashboard.brands.add')}
            </Button>
          }
        />
        {brandsList.length > 0 ? (
          <Card>
            <BrandListToolbar numSelected={selected.length} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table size={isCompact ? 'small' : 'medium'}>
                  <BrandListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={tableHeads}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    rowCount={brandsList.length}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {stableSort(brandsList, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const { _id, slug, name, desc, country, image, createdAt, updatedAt, isHide } = row;
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
                            <Tooltip title={desc ?? name} placement="right">
                              {isCompact ? (
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
                            </Tooltip>
                            <TableCell align="left" style={{ minWidth: 160 }}>
                              <Typography variant="subtitle4" noWrap>
                                {country}
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
                              {fDateTime(createdAt, currentLang.value)}
                            </TableCell>
                            <TableCell align="right" style={{ minWidth: 160 }}>
                              {fDateTime(updatedAt, currentLang.value)}
                            </TableCell>
                            <TableCell align="right" onClick={(event) => event.stopPropagation()}>
                              <BrandMoreMenu
                                onEdit={() => handleEditBrand(_id)}
                                onDelete={() => handleDeleteBrand(_id, slug)}
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
                count={brandsList.length}
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
          <EmptyCard title={t('dashboard.brands.title-not-found')} />
        )}
      </Container>
    </Page>
  );
}
