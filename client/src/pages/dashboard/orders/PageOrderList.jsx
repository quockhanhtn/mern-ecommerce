import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Card, Table, Button, TableRow, TableBody, TableCell, Container, TableContainer } from '@material-ui/core';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders, updateOrder } from '../../../actions/orders';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import useLocales from '../../../hooks/useLocales';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LoadingScreen from '../../../components/LoadingScreen';
import EmptyCard from '../../../components/EmptyCard';
import { OrderDetailForm, OrderListHead, OrderListToolbar, OrderTableRow } from '../../../components/dashboard/order';
import CategoryForm from '../categories/CategoryForm';
import { MTablePagination } from '../../../components/@material-extend';
//
import { stableSort, getComparator } from '../../../helper/listHelper';

// ----------------------------------------------------------------------

export default function PageOrderList() {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const { list: orderList, isLoading, error } = useSelector((state) => state.order);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('order');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentId, setCurrentId] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDetailForm, setOpenDetailForm] = useState(false);

  const [search, setSearch] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    dispatch(getAllOrders(search, orderStatus, paymentStatus, 1, 100000));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, orderStatus, paymentStatus]);

  const tableHeads = [
    {
      id: 'numericId',
      disablePadding: false,
      label: 'Mã'
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Khách hàng'
    },
    {
      id: 'phone',
      numeric: false,
      disablePadding: true,
      label: 'Số điện thoại'
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: true,
      label: t('order.order-status')
    },
    {
      id: 'paymentStatus',
      numeric: false,
      disablePadding: true,
      label: t('order.payment-status')
    },
    {
      id: 'paymentMethod',
      numeric: false,
      disablePadding: true,
      label: t('order.payment-method')
    },
    {
      id: 'total',
      numeric: true,
      disablePadding: false,
      label: t('cart.order.total')
    },
    {
      id: 'createdAt',
      numeric: true,
      disablePadding: true,
      label: t('dashboard.created-at')
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: false
    }
  ];

  const handleKeyPressToSearch = (e) => {
    if (e.key === 'Enter') {
      dispatch(getAllOrders(search, orderStatus, paymentStatus, 1, 100000));
    }
  };

  const handleSearchFilter = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeStatusFilter = (event, value) => {
    if (value) {
      setOrderStatus(value.value);
    }
  };

  const handleChangePaymentStatusFilter = (event, value) => {
    if (value) {
      setPaymentStatus(value.value);
    }
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

  const handleCreateNew = () => {
    setCurrentId(null);
    setOpenForm(true);
  };

  const handleUpdateOrder = (orderId, updatedData) => {
    dispatch(updateOrder(orderId, updatedData));
    console.log('handleUpdateOrder', { orderId, updatedData });
  };

  // Avoid a layout jump when reaching the last page with empty categoriesList.
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - orderList.length);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingScreen />;
    }
    if (error) {
      return <p>{JSON.parse(error)}</p>;
    }
    if (!orderList || orderList.length === 0) {
      return <EmptyCard title={t('dashboard.categories.title-not-found')} />;
    }
    return (
      <>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table size="small">
              <OrderListHead
                order={order}
                orderBy={orderBy}
                headLabel={tableHeads}
                numSelected={0}
                onRequestSort={handleRequestSort}
                rowCount={orderList.length}
              />
              <TableBody>
                {stableSort(orderList, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <OrderTableRow
                      key={index}
                      row={row}
                      onClick={() => {
                        setSelectedOrder(row);
                        setOpenDetailForm(true);
                      }}
                    />
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 33 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <MTablePagination
          count={orderList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    );
  };

  return (
    <Page title={t('order.dashboard-page-title')}>
      <Container>
        <CategoryForm open={openForm} setOpen={setOpenForm} currentId={currentId} setCurrentId={setCurrentId} />

        <OrderDetailForm
          order={selectedOrder}
          open={openDetailForm}
          setOpen={setOpenDetailForm}
          handleUpdate={handleUpdateOrder}
        />

        <HeaderBreadcrumbs
          heading={t('order.heading')}
          links={[{ name: t('dashboard.general'), href: PATH_DASHBOARD.general }, { name: t('order.title') }]}
          action={
            <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleCreateNew}>
              {t('dashboard.orders.add')}
            </Button>
          }
        />

        <Card>
          <OrderListToolbar
            search={search}
            onSearchChange={handleSearchFilter}
            onKeyDown={handleKeyPressToSearch}
            orderStatus={orderStatus}
            onChangeOrderStatus={handleChangeStatusFilter}
            paymentStatus={paymentStatus}
            onChangePaymentStatus={handleChangePaymentStatusFilter}
          />
          {renderContent()}
        </Card>
      </Container>
    </Page>
  );
}
