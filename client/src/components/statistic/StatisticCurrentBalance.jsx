// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Button, Card, Typography, Stack } from '@material-ui/core';
// utils
import { fCurrency } from '../../utils/formatNumber';
//
import { MButton } from '../@material-extend';

// ----------------------------------------------------------------------

const RowStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

// ----------------------------------------------------------------------

export default function StatisticCurrentBalance() {
  const currentBalance = 187650;
  const sentAmount = 25500;
  const totalAmount = currentBalance - sentAmount;

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        Your Current Balance
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h3">{fCurrency(totalAmount)}</Typography>

        <RowStyle>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Your Current Balance
          </Typography>
          <Typography variant="body2">{fCurrency(currentBalance)}</Typography>
        </RowStyle>

        <RowStyle>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Sent Amount
          </Typography>
          <Typography variant="body2">- {fCurrency(sentAmount)}</Typography>
        </RowStyle>

        <RowStyle>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total Amount
          </Typography>
          <Typography variant="subtitle1">{fCurrency(totalAmount)}</Typography>
        </RowStyle>

        <Stack direction="row" spacing={1.5}>
          <MButton fullWidth variant="contained" color="warning">
            Transfer
          </MButton>
          <Button fullWidth variant="contained">
            Receive
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
