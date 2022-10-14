import {
  Box,
  Card,
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
} from '@mui/material';
import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '~/routes/paths';
import useLocales from '~/hooks/useLocales';
import * as Helper from '~/helper/listHelper';
import { getAllUsers } from '~/redux/actions/users';
import Page from '~/components/Page';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
import LoadingScreen from '~/components/LoadingScreen';
import Label from '~/components/Label';
import Scrollbar from '~/components/Scrollbar';
import { ImageBrokenIcon } from '~/assets';
import { UserListHead, UserListToolbar, UserMoreMenu } from '~/components/dashboard/users';
import DetailUser from './DetailUser';
// ----------------------------------------------------------------------
const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm
}));

export default function PageCustomerList() {
  const { t } = useLocales();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { list: usersList, isLoading } = useSelector((state) => state.user);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentId, setCurrentId] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const tableHeads = [
    {
      id: 'fullName',
      numeric: false,
      disablePadding: true,
      label: t('dashboard.users.full-name')
    },
    {
      id: 'gender',
      numeric: false,
      disablePadding: true,
      label: t('dashboard.users.gender')
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: t('dashboard.users.email')
    },
    {
      id: 'phone',
      numeric: true,
      disablePadding: false,
      label: t('dashboard.users.phone')
    },
    {
      id: 'isHide',
      numeric: true,
      disablePadding: false,
      label: t('dashboard.users.status')
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: false
    }
  ];

  const handleDetailUser = (id) => {
    setCurrentId(id);
    setOpenForm(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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

  const handleLockAccount = () => {};

  // Avoid a layout jump when reaching the last page with empty brandsList.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersList.length) : 0;

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page title={t('dashboard.users.page-title')}>
      <Container>
        {openForm && (
          <DetailUser open={openForm} setOpen={setOpenForm} currentId={currentId} setCurrentId={setCurrentId} />
        )}
        <HeaderBreadcrumbs
          heading={t('dashboard.users.heading')}
          links={[
            { name: t('dashboard.title'), href: PATH_DASHBOARD.root },
            {
              name: t('dashboard.ecommerce'),
              href: PATH_DASHBOARD.root
            },
            { name: t('dashboard.users.heading') }
          ]}
        />

        <Card>
          <UserListToolbar />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size={dense ? 'small' : 'medium'}>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={tableHeads}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {Helper.stableSort(usersList, Helper.getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const { _id, fullName, gender, image, email, phone, isHide } = row;
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow hover tabIndex={-1} key={_id}>
                          {dense ? (
                            <TableCell component="th" id={labelId} scope="row" padding="none">
                              {fullName}
                            </TableCell>
                          ) : (
                            <TableCell component="th" scope="row" padding="none">
                              <Box sx={{ py: 2, display: 'flex', alignItems: 'center' }}>
                                {image ? (
                                  <ThumbImgStyle alt={fullName} src={image} />
                                ) : (
                                  <ImageBrokenIcon width={64} height={64} marginRight={2} />
                                )}
                                <Typography variant="subtitle2" noWrap>
                                  {fullName}
                                </Typography>
                              </Box>
                            </TableCell>
                          )}
                          <TableCell align="left" style={{ minWidth: 80 }}>
                            {gender}
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: 160 }}>
                            {email}
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: 160 }}>
                            {phone}
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={isHide ? 'default' : 'success'}
                            >
                              {t(`dashboard.brands.${isHide ? 'hidden' : 'visible'}`)}
                            </Label>
                          </TableCell>
                          <TableCell align="right" onClick={(event) => event.stopPropagation()}>
                            <UserMoreMenu
                              onLockAccount={() => handleLockAccount(_id)}
                              onDetail={() => handleDetailUser(_id)}
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
              count={usersList.length}
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
      </Container>
    </Page>
  );
}
