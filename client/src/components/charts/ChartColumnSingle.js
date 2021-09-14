import { merge } from 'lodash';

import ReactApexChart from 'react-apexcharts';
//
import BaseOptionChart from './BaseOptionChart';

// ----------------------------------------------------------------------

const CHART_DATA = [{ name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] }];

export default function ChartColumnSingle() {
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '14%', borderRadius: 4 } },
    stroke: { show: false },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
    },
    tooltip: {
      y: {
        formatter(val) {
          return `$ ${val} thousands`;
        }
      }
    }
  });

  return <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={320} />;
}
