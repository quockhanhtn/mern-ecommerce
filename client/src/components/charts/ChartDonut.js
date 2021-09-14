import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
//
import BaseOptionChart from './BaseOptionChart';

// ----------------------------------------------------------------------

const CHART_DATA = [44, 55, 13, 43];

export default function ChartDonut() {
  const chartOptions = merge(BaseOptionChart(), {
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    stroke: { show: false },
    legend: { horizontalAlign: 'center' },
    plotOptions: { pie: { donut: { size: '90%' } } }
  });

  return <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} width={400} />;
}
