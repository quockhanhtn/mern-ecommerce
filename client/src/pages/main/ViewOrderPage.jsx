// icons
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { useEffect, useState } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Link,
  Stack,
  Typography
} from '@material-ui/core';
// hooks
import { useNavigate, useParams } from 'react-router-dom';
import useLocales from '../../hooks/useLocales';
// components
import Page from '../../components/Page';
import LoadingScreen from '../../components/LoadingScreen';
import { OrderCompleteIllustration } from '../../assets';
//
import * as Api from '../../api';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(10),
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 100 : 800]
}));

// ----------------------------------------------------------------------

export default function ViewOrderPage() {
  const { t } = useLocales();
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrder = async () => {
    setIsLoading(true);
    const { data } = await Api.getOrder(orderId);
    setOrder(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const handleNavigateToHome = () => {
    navigate('/');
  };

  const renderPaymentSuccess = () => (
    <>
      <Typography variant="h4" paragraph sx={{ textAlign: 'center' }}>
        Thank you for your purchase!
      </Typography>

      <OrderCompleteIllustration sx={{ height: 260, my: 10 }} />

      <Typography align="left" paragraph>
        Thanks for placing order &nbsp;
        <Link href="#">01dc1370-3df6-11eb-b378-0242ac130002</Link>
      </Typography>

      <Typography align="left" sx={{ color: 'text.secondary' }}>
        We will send you a notification within 5 days when it ships.
        <br /> <br /> If you have any question or queries then fell to get in contact us. <br /> <br /> All the best,
      </Typography>
      <Button color="inherit" onClick={handleNavigateToHome} startIcon={<Icon icon={arrowIosBackFill} />}>
        Continue Shopping
      </Button>
    </>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page title={t('order.page-title')} id="move_top">
      <ContentStyle>
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Card>
              <CardHeader title="Thông tin người mua" />
              <CardContent>
                <Typography variant="h6">{order?.customer?.name}</Typography>
                <Typography variant="body2">{order?.customer?.phone}</Typography>
                <Typography variant="body2">{`${order?.address?.street} ${order?.address?.ward} ${order?.address?.district} ${order?.address?.province}`}</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title={t('order.order-status')} />
              <CardContent>{t(`order.status-${order?.status}`)}</CardContent>
            </Card>
            <Card>
              <CardHeader title={t('order.payment-method')} />
              <CardContent>{t(`order.payment-method-${order?.paymentMethod}`)}</CardContent>
            </Card>
            <Card>
              <CardHeader title={t('order.payment-status')} />
              <CardContent>{t(`order.payment-status-${order?.paymentStatus}`)}</CardContent>
            </Card>
          </Stack>
          <>{JSON.stringify(order)}</>
        </Container>
      </ContentStyle>
    </Page>
  );
}
