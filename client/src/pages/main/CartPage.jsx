import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { Box, Grid, Step, Stepper, Container, StepLabel, StepConnector, useMediaQuery } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// hooks
import { useSelector } from 'react-redux';
import { useLocales } from '../../hooks';
// components
import Page from '../../components/Page';
import { CheckoutCart, CheckoutPayment, CheckoutBillingAddress } from '../../components/checkout';

// ----------------------------------------------------------------------

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'divider',
        bgcolor: 'background.default'
      }}
    >
      {completed ? (
        <Box component={Icon} icon={checkmarkFill} sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }} />
      ) : (
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'currentColor' }} />
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

const StepperStyle = styled(Stepper)(({ theme }) => ({
  [theme.breakpoints.up(1440)]: {
    position: 'fixed',
    left: theme.spacing(2),
    top: 100, // top bar size
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center'
  },
  paddingTop: 100 // top bar size
}));

const StepLabelStyle = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-label': {
    typography: 'subtitle2',
    color: 'text.disabled',
    paddingBottom: theme.spacing(3)
  }
}));

export default function CartPage() {
  const { t } = useLocales();
  const isExtraScreen = useMediaQuery((theme) => theme.breakpoints.up(1440));
  const { activeStep } = useSelector((state) => state.order);

  const steps = [
    {
      label: t('cart.step.1'),
      component: <CheckoutCart />
    },
    {
      label: t('cart.step.2'),
      component: <CheckoutBillingAddress />
    },
    {
      label: t('cart.step.3'),
      component: <CheckoutPayment />
    }
  ];

  return (
    <Page title={t('cart.page-title')} sx={{ mt: -7 }}>
      <Container sx={{ mt: 0, mb: (theme) => theme.spacing(5) }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <StepperStyle
              alternativeLabel
              activeStep={activeStep}
              connector={isExtraScreen ? null : <StepConnector />}
              orientation={isExtraScreen ? 'vertical' : 'horizontal'}
            >
              {steps.map((s) => (
                <Step key={s.label}>
                  <StepLabelStyle StepIconComponent={QontoStepIcon}>{s.label}</StepLabelStyle>
                </Step>
              ))}
            </StepperStyle>
          </Grid>
        </Grid>

        {steps[activeStep].component}
      </Container>
    </Page>
  );
}
