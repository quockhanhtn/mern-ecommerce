import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fCurrency, fNumber, fPercent } from '../../utils/formatNumber';
//
import BaseOptionChart from '../charts/BaseOptionChart';
import useLocales from '../../hooks/useLocales';
import { getAllOrders } from '../../redux/actions/orders';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

// ----------------------------------------------------------------------

const PERCENT = 28.5;
const CHART_DATA = [{ data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14] }];

export default function StatisticTurnover() {
  const { t, currentLang } = useLocales();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { list: orderList } = useSelector((state) => state.orderManager);
  const [turnover, setTurnover] = useState(0);

  useEffect(() => {
    dispatch(getAllOrders('', '', '', 1, 100000));
  }, [dispatch]);

  useEffect(() => {
    let subTotal = 0;
    const paid = orderList.filter((order) => order.paymentStatus === 'paid');
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const order of paid) {
      subTotal += order.subTotal;
    }
    setTurnover(subTotal);
  }, [orderList]);

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.error.main],
    chart: { animations: { enabled: true }, sparkline: { enabled: true } },
    stroke: { width: 2 },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      },
      marker: { show: false }
    }
  });

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" paragraph>
          {t('dashboard.statistics.turnover-total')}
        </Typography>
        <Typography variant="h3" gutterBottom>
          {fCurrency(turnover, currentLang.value)}
        </Typography>

        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <IconWrapperStyle
            sx={{
              ...(PERCENT < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16)
              })
            }}
          >
            <Icon width={16} height={16} icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill} />
          </IconWrapperStyle>

          <Typography variant="subtitle2" component="span">
            {PERCENT > 0 && '+'}
            {fPercent(PERCENT)}
          </Typography>
          <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
            &nbsp;than last week
          </Typography>
        </Stack>
      </Box>

      <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} width={120} height={80} />
    </Card>
  );
}
