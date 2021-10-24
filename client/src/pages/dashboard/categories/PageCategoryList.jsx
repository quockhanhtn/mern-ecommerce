import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
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
  TableContainer,
  TablePagination
} from '@material-ui/core';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories, deleteCategory } from '../../../actions/categories';
// utils
import { fDateTime } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LoadingScreen from '../../../components/LoadingScreen';
import {
  CategoryListHead,
  CategoryListToolbar,
  CategoryMoreMenu,
  CategoryCollapsibleTableRow
} from '../../../components/dashboard/category-list';
import CategoryForm from './CategoryForm';
import useLocales from '../../../hooks/useLocales';
import { ImageBrokenIcon } from '../../../assets';
import { stableSort, getComparator } from '../../../helper/Helper';

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
  const { t } = useLocales();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { list: categoriesList, isLoading, hasError } = useSelector((state) => state.category);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentId, setCurrentId] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const tableHeads = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: t('dashboard.categories.name')
    },
    // {
    //   id: 'desc',
    //   numeric: false,
    //   disablePadding: false,
    //   label: t('dashboard.categories.desc')
    // },
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

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
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
    // TODO: handle not found
    return <SearchNotFound />;
  }

  console.log('Categories list: ', categoriesList);
  return (
    <Page title="Ecommerce: Category List | Minimal-UI">
      <Container>
        <CategoryForm open={openForm} setOpen={setOpenForm} currentId={currentId} setCurrentId={setCurrentId} />

        <HeaderBreadcrumbs
          heading="Category List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.app.categories
            },
            { name: 'Category List' }
          ]}
          action={
            <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleCreateNew}>
              {t('dashboard.categories.add')}
            </Button>
          }
        />

        <Card>
          <CategoryListToolbar searchPlaceHolder={t('dashboard.categories.search')} numSelected={selected.length} />

          {categoriesList.length > 0 ? (
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table size={dense ? 'small' : 'medium'}>
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
                        const { _id, slug, name, image, createdAt, updatedAt, isHide } = row;
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
                            <TableCell align="left">
                              <Label
                                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                color={isHide ? 'default' : 'success'}
                              >
                                {t(`dashboard.categories.${isHide ? 'hidden' : 'visible'}`)}
                              </Label>
                            </TableCell>
                            <TableCell align="right" style={{ minWidth: 160 }}>
                              {fDateTime(createdAt)}
                            </TableCell>
                            <TableCell align="right" style={{ minWidth: 160 }}>
                              {fDateTime(updatedAt)}
                            </TableCell>
                            <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                              <CategoryMoreMenu
                                editTitle={t('common.edit')}
                                onEdit={() => handleEdit(_id)}
                                deleteTitle={t('common.delete')}
                                onDelete={() => handleDeleteCategory(_id)}
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
          ) : (
            <div>Empty</div>
          )}

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              labelRowsPerPage={t('common.rows-per-page')}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={categoriesList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Box sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}>
              <FormControlLabel
                control={<Switch checked={dense} onChange={(e) => setDense(e.target.checked)} />}
                label={t('common.small-padding')}
              />
            </Box>
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
