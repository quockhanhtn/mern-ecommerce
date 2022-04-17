import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { Box, Grid, Step, Stepper, Container, StepLabel, StepConnector } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// hooks
import { useLocales, useOrderFlow } from '../../hooks';
// components
import Page from '../../components/Page';
import { CheckoutCart, CheckoutPayment, CheckoutBillingAddress } from '../../components/checkout';

// ----------------------------------------------------------------------

const QontoConnector = withStyles((theme) => ({
  alternativeLabel: { top: 10, left: 'calc(-50% + 20px)', right: 'calc(50% + 20px)' },
  active: { '& $line': { borderColor: theme.palette.primary.main } },
  completed: { '& $line': { borderColor: theme.palette.primary.main } },
  line: { borderTopWidth: 2, borderColor: theme.palette.divider }
}))(StepConnector);

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

export default function CartPage() {
  const { t } = useLocales();

  const { activeStep } = useOrderFlow();

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

  // useEffect(() => {
  //   if (isMountedRef.current) {
  //     // dispatch(getCart(cart));
  //   }
  // }, [dispatch, isMountedRef, cart]);

  return (
    <Page title={t('cart.page-title')}>
      <Container sx={{ marginY: (theme) => theme.spacing(5) }}>
        <Grid container justifyContent="flex-start">
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
              {steps.map((s) => (
                <Step key={s.label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{ '& .MuiStepLabel-label': { typography: 'subtitle2', color: 'text.disabled' } }}
                  >
                    {s.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>

        {steps[activeStep].component}
      </Container>
    </Page>
  );
}
