import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
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
  TableRow,
  Typography
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories, deleteCategory } from '../../../redux/slices/categorySlice';
import { useLocales } from '../../../hooks';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { ThumbImgStyle } from '../../../components/@styled';
import { MTablePagination } from '../../../components/@material-extend';
import { MTableHead, MTableToolbar } from '../../../components/@material-extend/table';

import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LoadingScreen from '../../../components/LoadingScreen';
import EmptyCard from '../../../components/EmptyCard';
import { CategoryMoreMenu } from '../../../components/dashboard/category-list';
import CategoryForm from './CategoryForm';
import { ImageBrokenIcon } from '../../../assets';

// utils
import { fDateTime } from '../../../utils/formatTime';
import { stableSort, getComparator } from '../../../helper/listHelper';

// ----------------------------------------------------------------------

export default function PageCategoryList() {
  const { t, currentLang } = useLocales();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { list: categoriesList, isLoading, error, deletedIds } = useSelector((state) => state.category);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('order');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentId, setCurrentId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const mgs = error?.message?.[currentLang.value] || 'Có lỗi xảy ra !';
      enqueueSnackbar(mgs, { variant: 'error' });
    }
    if (deletedIds && deletedIds.some((x) => x === deletingId)) {
      enqueueSnackbar('Xóa danh mục thành công', { variant: 'success' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, deletedIds]);

  const handleDeleteCategory = (id, slug) => {
    setDeletingId(id);
    dispatch(deleteCategory(id));
    const selectedIndex = selected.indexOf(slug);
    if (selectedIndex > -1) {
      selected.splice(selectedIndex, 1);
    }
    setSelected(selected);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = categoriesList.map((n) => n.slug);
      setSelected(newSelected);
      if (selected.count === 1) {
        setCurrentId(categoriesList[categoriesList.indexOf(selected[0])]._id);
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

  const handleCreateNew = () => {
    setCurrentId(null);
    setOpenForm(true);
  };

  const handleEdit = (categoryId) => {
    setCurrentId(categoryId);
    setOpenForm(true);
  };

  const isSelected = (slug) => selected.indexOf(slug) !== -1;

  const tableHeads = [
    {
      id: 'order',
      align: 'center',
      disablePadding: true,
      label: t('common.order')
    },
    {
      id: 'name',
      align: 'left',
      disablePadding: false,
      label: t('dashboard.categories.name')
    },
    {
      id: 'isHide',
      align: 'left',
      disablePadding: false,
      label: t('dashboard.categories.status')
    },
    {
      id: 'countProduct',
      align: 'left',
      disablePadding: false,
      label: t('dashboard.categories.available')
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

  // Avoid a layout jump when reaching the last page with empty categoriesList.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoriesList.length) : 0;

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page title={t('dashboard.categories.page-title')}>
      <Container maxWidth={false}>
        <CategoryForm open={openForm} setOpen={setOpenForm} currentId={currentId} setCurrentId={setCurrentId} />

        <HeaderBreadcrumbs
          heading={t('dashboard.categories.heading')}
          links={[
            { name: t('dashboard.title'), href: PATH_DASHBOARD.root },
            {
              name: t('dashboard.management'),
              href: PATH_DASHBOARD.app.root
            },
            { name: t('dashboard.categories.heading') }
          ]}
          action={
            <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleCreateNew}>
              {t('dashboard.categories.add')}
            </Button>
          }
        />

        {categoriesList.length > 0 ? (
          <Card>
            <MTableToolbar searchPlaceHolder={t('dashboard.categories.search')} numSelected={selected.length} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table size={isCompact ? 'small' : 'medium'}>
                  <MTableHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={tableHeads}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    rowCount={categoriesList.length}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {stableSort(categoriesList, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const { _id, slug, order, name, image, createdAt, updatedAt, isHide, countProduct } = row;
                        const isItemSelected = isSelected(slug);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, slug)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={_id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} />
                            </TableCell>
                            <TableCell align="left" component="th" id={labelId} scope="row" padding="none">
                              {order}
                            </TableCell>
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
                            <TableCell align="left">
                              <Label
                                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                color={isHide ? 'default' : 'success'}
                              >
                                {t(`dashboard.categories.${isHide ? 'hidden' : 'visible'}`)}
                              </Label>
                            </TableCell>
                            <TableCell align="left">{countProduct}</TableCell>
                            <TableCell align="right" style={{ minWidth: 160 }}>
                              {fDateTime(createdAt, currentLang.value)}
                            </TableCell>
                            <TableCell align="right" style={{ minWidth: 160 }}>
                              {fDateTime(updatedAt, currentLang.value)}
                            </TableCell>
                            <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                              <CategoryMoreMenu
                                editTitle={t('common.edit')}
                                onEdit={() => handleEdit(_id)}
                                deleteTitle={t('common.delete')}
                                onDelete={() => handleDeleteCategory(_id, slug)}
                                nameInfo={name}
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
                </Table>
              </TableContainer>
            </Scrollbar>

            <Box sx={{ position: 'relative' }}>
              <MTablePagination
                count={categoriesList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <Box sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}>
                <FormControlLabel
                  control={<Switch checked={isCompact} onChange={(e) => setIsCompact(e.target.checked)} />}
                  label={t('common.small-padding')}
                />
              </Box>
            </Box>
          </Card>
        ) : (
          <EmptyCard title={t('dashboard.categories.title-not-found')} />
        )}
      </Container>
    </Page>
  );
}
