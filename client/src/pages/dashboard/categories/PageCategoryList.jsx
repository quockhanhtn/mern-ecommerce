import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Table,
  Button,
  Switch,
  FormControlLabel,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer
} from '@material-ui/core';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories, deleteCategory } from '../../../actions/categories';
// utils
import { fDateTime } from '../../../utils/formatTime';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { MTablePagination } from '../../../components/@material-extend';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LoadingScreen from '../../../components/LoadingScreen';
import EmptyCard from '../../../components/EmptyCard';
import { CategoryListHead, CategoryListToolbar, CategoryMoreMenu } from '../../../components/dashboard/category-list';
import CategoryForm from './CategoryForm';
import useLocales from '../../../hooks/useLocales';
import { ImageBrokenIcon } from '../../../assets';
import { stableSort, getComparator } from '../../../helper/listHelper';

// ----------------------------------------------------------------------

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2, 0, 0),
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

export default function PageCategoryList() {
  const { t, currentLang } = useLocales();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { list: categoriesList, isLoading, hasError } = useSelector((state) => state.category);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('order');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentId, setCurrentId] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const tableHeads = [
    {
      id: 'order',
      disablePadding: true,
      label: t('common.order')
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: t('dashboard.categories.name')
    },
    {
      id: 'isHide',
      numeric: false,
      disablePadding: false,
      label: t('dashboard.categories.status')
    },
    {
      id: 'createdAt',
      numeric: true,
      disablePadding: false,
      label: t('dashboard.created-at')
    },
    {
      id: 'updatedAt',
      numeric: true,
      disablePadding: false,
      label: t('dashboard.updated-at')
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: false
    }
  ];

  const handleDeleteCategory = (id, slug) => {
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

  // Avoid a layout jump when reaching the last page with empty categoriesList.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoriesList.length) : 0;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (hasError) {
    return <SearchNotFound />;
  }

  return (
    <Page title={t('dashboard.categories.page-title')}>
      <Container>
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
            <CategoryListToolbar searchPlaceHolder={t('dashboard.categories.search')} numSelected={selected.length} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table size={isCompact ? 'small' : 'medium'}>
                  <CategoryListHead
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
                        const { _id, slug, order, name, image, createdAt, updatedAt, isHide } = row;
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
                        <TableCell colSpan={6} />
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
