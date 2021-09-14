import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

const CHART_DATA = [44, 75];

export default function EcommerceSaleByGender() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    labels: ['Mens', 'Womens'],
    legend: { floating: true, horizontalAlign: 'center' },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            {
              offset: 0,
              color: theme.palette.primary.light
            },
            {
              offset: 100,
              color: theme.palette.primary.main
            }
          ],
          [
            {
              offset: 0,
              color: theme.palette.warning.light
            },
            {
              offset: 100,
              color: theme.palette.warning.main
            }
          ]
        ]
      }
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '68%' },
        dataLabels: {
          value: { offsetY: 16 },
          total: {
            formatter: () => fNumber(2324)
          }
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Sale By Gender" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="radialBar" series={CHART_DATA} options={chartOptions} height={310} />
      </ChartWrapperStyle>
    </Card>
  );
}
