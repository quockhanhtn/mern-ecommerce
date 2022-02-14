import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Typography, Stack } from '@material-ui/core';
// utils
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fNumber, fPercent } from '../../utils/formatNumber';
//
import BaseOptionChart from '../charts/BaseOptionChart';
import useLocales from '../../hooks/useLocales';
import { getAllUsers } from '../../redux/actions/users';

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

const PERCENT = 26.3;
const CHART_DATA = [{ data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14] }];

export default function StatisticTotalUser() {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { list: usersList } = useSelector((state) => state.user);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (usersList) {
      const currentDate = new Date();
      const currentDateInWeek = new Date();
      const currentDateLastWeek = new Date();
      currentDateInWeek.setDate(currentDateInWeek.getDate() - 7);
      currentDateLastWeek.setDate(currentDateLastWeek.getDate() - 14);

      const inWeek = usersList.filter(
        (item) =>
          new Date(item?.createdAt).getTime() <= currentDate.getTime() &&
          new Date(item?.createdAt).getTime() >= currentDateInWeek.getTime()
      );

      const lastWeek = usersList.filter(
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
  }, [usersList]);

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.info.main],
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
          {t('dashboard.statistics.user-has-account-total')}
        </Typography>
        <Typography variant="h3" gutterBottom>
          {fNumber(usersList?.length)}
        </Typography>

        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16)
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
