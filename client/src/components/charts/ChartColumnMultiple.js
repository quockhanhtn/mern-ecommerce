import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
//
import BaseOptionChart from './BaseOptionChart';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
  { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] }
];

export default function ChartColumnMultiple() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
    },
    tooltip: {
      y: {
        formatter(val) {
          return `$ ${val} thousands`;
        }
      }
    },
    plotOptions: { bar: { columnWidth: '34%', borderRadius: 4 } }
  });

  return <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={320} />;
}
