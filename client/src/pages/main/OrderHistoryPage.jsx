import { Card, Container } from '@material-ui/core';
// hooks
import { useEffect, useState } from 'react';
import useLocales from '../../hooks/useLocales';
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import { PhoneVerifyDialog } from '../../components/authentication/phone-verify';
//
import * as api from '../../api';
// ----------------------------------------------------------------------

export default function OrderHistoryPage() {
  const { t } = useLocales();
  const { isAuthenticated } = useAuth();
  const [isOpenVerify, setOpenVerify] = useState(false);
  const [canGetList, setCanGetList] = useState(false);

  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    let auth = {};
    if (!isAuthenticated) {
      auth = JSON.parse(sessionStorage.getItem('otpVerification'));
    }
    try {
      setIsLoading(true);
      const { data } = await api.getListOrders(auth);
      setList(data.data);
    } catch (e) {
      setError(e?.response?.data || e);
    } finally {
      setIsLoading(false);
    }
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

  useEffect(() => {
    if (canGetList) {
      fetchData();
    }
  }, [canGetList]);

  const handleVerifySuccess = () => {
    setOpenVerify(false);
    setCanGetList(true);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>{error}</div>;
    }
    if (list.length === 0) {
      return <div>{t('No data')}</div>;
    }
    return <div>{JSON.stringify(list)}</div>;
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
        {renderContent()}
      </Container>
    </Page>
  );
}
