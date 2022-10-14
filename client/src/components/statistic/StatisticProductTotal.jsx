import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fNumber, fPercent } from '../../utils/formatNumber';
//
import BaseOptionChart from '../charts/BaseOptionChart';
import { getAllProducts } from '../../redux/slices/productSlice';
import useLocales from '../../hooks/useLocales';
import * as api from '../../api';

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
const CHART_DATA = [{ data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14] }];

export default function StatisticProductTotal() {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const { list: productsList } = useSelector((state) => state.product);
  const [products, setProducts] = useState([]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { data } = await api.getFullAllProduct();
    setProducts(data.data);
  }, [productsList]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (products) {
      const currentDate = new Date();
      const currentDateInWeek = new Date();
      const currentDateLastWeek = new Date();
      currentDateInWeek.setDate(currentDateInWeek.getDate() - 7);
      currentDateLastWeek.setDate(currentDateLastWeek.getDate() - 14);

      const inWeek = products.filter(
        (item) =>
          new Date(item?.createdAt).getTime() <= currentDate.getTime() &&
          new Date(item?.createdAt).getTime() >= currentDateInWeek.getTime()
      );

      const lastWeek = products.filter(
        (item) =>
          new Date(item?.createdAt).getTime() <= currentDateInWeek.getTime() &&
          new Date(item?.createdAt).getTime() >= currentDateLastWeek.getTime()
      );
      if (lastWeek.length !== 0) {
        setPercent((inWeek.length / lastWeek.length) * 100);
      } else {
        setPercent(100);
      }
    }
  }, [products]);

  const chartOptions = merge(BaseOptionChart(), {
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
          {t('dashboard.statistics.product-total')}
        </Typography>
        <Typography variant="h3" gutterBottom>
          {fNumber(products?.length)}
        </Typography>

        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: 'error.main',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.16)
              })
            }}
          >
            <Icon width={16} height={16} icon={percent >= 0 ? trendingUpFill : trendingDownFill} />
          </IconWrapperStyle>

          <Typography variant="subtitle2" component="span">
            {percent > 0 && '+'}
            {fPercent(percent)}
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
