// material
import { Box, Button, Container, Divider, Link, Stack, Typography } from '@material-ui/core';
// components
import { Icon } from '@iconify/react';
import queryString from 'query-string';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Page from '../../../components/Page';
import { OrderCompleteIllustration } from '../../../assets';
import * as HelperPayment from '../../../helper/paymentHelper';

// ----------------------------------------------------------------------

export default function CartPageResult() {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);

  useEffect(() => {
    const urlString = window.location.href;
    const params = new URL(urlString).searchParams;
    const codeParam = params.get('code');
    setCode(codeParam);
    if (!codeParam) {
      navigate('/cart');
    }
  }, []);

  const handleResetStep = () => {
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
      <Button color="inherit" onClick={handleResetStep} startIcon={<Icon icon={arrowIosBackFill} />}>
        Continue Shopping
      </Button>
    </>
  );

  return (
    <Page title="Page One | Minimal-UI">
      <Container maxWidth="md">
        <Box sx={{ p: 4, margin: 'auto' }}>
          {code === '00' ? (
            renderPaymentSuccess()
          ) : (
            <Typography variant="h4" paragraph sx={{ textAlign: 'center' }}>
              Thanh toán thất bại!
            </Typography>
          )}
        </Box>
      </Container>
    </Page>
  );
}
