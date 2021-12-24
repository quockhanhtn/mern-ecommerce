import { Card, Container } from '@material-ui/core';
// hooks
import { useNavigate } from 'react-router-dom';
import useLocales from '../../hooks/useLocales';
// components
import Page from '../../components/Page';
import { OTPPhoneInput } from '../../components/authentication/phone-verify';

// ----------------------------------------------------------------------

export default function OrderHistoryPage() {
  const { t } = useLocales();
  const navigate = useNavigate();

  return (
    <Page title={t('order.page-title')} id="move_top">
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <OTPPhoneInput />
      </Container>
    </Page>
  );
}
