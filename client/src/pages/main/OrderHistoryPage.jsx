import { Card, Container, Table, TableRow, TableBody, TableCell, TableContainer } from '@mui/material';
// hooks
import { useEffect, useState } from 'react';
import useLocales from '../../hooks/useLocales';
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { OrderDetailForm, OrderListHead, OrderListToolbar, OrderTableRow } from '../../components/dashboard/order';
import { MTablePagination } from '../../components/@material-extend';
import { PhoneVerifyDialog } from '../../components/authentication/phone-verify';
import { stableSort, getComparator } from '../../helper/listHelper';
//
import * as api from '../../api';
// ----------------------------------------------------------------------

export default function OrderHistoryPage() {
  const { t } = useLocales();
  const { isAuthenticated } = useAuth();
  const [isOpenVerify, setOpenVerify] = useState(false);
  const [canGetList, setCanGetList] = useState(false);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('order');

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDetailForm, setOpenDetailForm] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [list, setList] = useState([]);
  const [listToShow, setListToShow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  async function fetchData() {
    const params = {
      page: 1,
      status: orderStatus,
      paymentStatus,
      limit: 1000000000
    };
    if (!isAuthenticated) {
      params.accessToken = JSON.parse(sessionStorage.getItem('otpVerification'))?.accessToken;
    }
    try {
      setIsLoading(true);
      const { data } = await api.getListOrders(params);
      setList(data.data);
    } catch (e) {
      setError(e?.response?.data || e);
    } finally {
      setIsLoading(false);
    }
  }

  async function actionReOrder(id) {
    console.log('actionReOrder', id);
  }

  async function actionCancelOrder(id) {
    console.log('actionCancelOrder', id);
  }

  useEffect(() => {
    if (!isAuthenticated) {
      const otpVerification = JSON.parse(sessionStorage.getItem('otpVerification'));
      if (!otpVerification || otpVerification.expirationTime < Date.now()) {
        setOpenVerify(true);
        return;
      }
    }
    setCanGetList(true);
  }, [isAuthenticated]);

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
      label: 'Họ tên'
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

  useEffect(() => {
    if (canGetList) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canGetList, orderStatus, paymentStatus]);

  useEffect(() => {
    const newList = list.filter((item) => item.numericId.toString().includes(search));
    setListToShow(newList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, list]);

  const handleVerifySuccess = () => {
    setOpenVerify(false);
    setCanGetList(true);
  };

  const handleKeyPressToSearch = (e) => {
    if (e.key === 'Enter') {
      fetchData();
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

  // Avoid a layout jump when reaching the last page with empty categoriesList.
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - listToShow.length);

  const renderContent = () => {
    if (isLoading) {
      return <div style={{ padding: '5px 20px 20px 20px' }}>Đang tải...</div>;
    }
    if (error) {
      return (
        <>
          <div style={{ padding: '5px 20px 20px 20px', color: 'red' }}>Có lỗi xãy ra, vui lòng thử lại</div>
          <div style={{ padding: '5px 20px 20px 20px' }}>{JSON.stringify(error)}</div>;
        </>
      );
    }
    if (listToShow.length === 0) {
      return <div style={{ padding: '5px 20px 20px 20px' }}>Không tìm thấy đơn hàng</div>;
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
                rowCount={listToShow.length}
              />
              <TableBody>
                {stableSort(listToShow, getComparator(order, orderBy))
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
          count={listToShow.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    );
  };

  return (
    <Page title={t('order.page-title')} id="move_top">
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <PhoneVerifyDialog
          open={isOpenVerify}
          onClose={() => {
            setOpenVerify(false);
          }}
          onSuccess={handleVerifySuccess}
        />

        <OrderDetailForm
          order={selectedOrder}
          open={openDetailForm}
          setOpen={setOpenDetailForm}
          actionReOrder={actionReOrder}
          actionCancelOrder={actionCancelOrder}
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
