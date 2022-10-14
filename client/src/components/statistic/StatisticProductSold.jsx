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
import { fNumber } from '~/utils/formatNumber';
//
import useLocales from '~/hooks/useLocales';
import { getAllProducts } from '~/redux/slices/productSlice';
import BaseOptionChart from '../charts/BaseOptionChart';

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

export default function StatisticProductSold() {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const { list: productsList } = useSelector((state) => state.product);
  const [productSold, setProductSold] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [percent, setPercent] = useState(53);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    let productSoldTotal = 0;
    for (let i = 0; i < productsList?.length; i++) {
      for (let j = 0; j < productsList[i]?.variants.length; j++) {
        productSoldTotal += productsList[i].variants[j].sold;
      }
    }
    setProductSold(productSoldTotal);
  }, [productsList]);

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
          {t('dashboard.statistics.product-sold-total')}
        </Typography>
        <Typography variant="h3" gutterBottom>
          {fNumber(productSold)}
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

          {/* <Typography variant="subtitle2" component="span"> */}
          {/*  {percent > 0 && '+'} */}
          {/*  {fPercent(percent)} */}
          {/* </Typography> */}
          {/* <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}> */}
          {/*  &nbsp;than last week */}
          {/* </Typography> */}
        </Stack>
      </Box>

      <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} width={120} height={80} />
    </Card>
  );
}
