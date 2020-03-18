import './styles/main.css';
import ColumnChart from './components/column-chart/column-chart';

const ordersData = [
  { value: 10 },
  { value: 20 },
  { value: 80 },
  { value: 100 },
  { value: 35 },
  { value: 25 }
];

const salesData = [
  { value: 30 },
  { value: 40 },
  { value: 20 },
  { value: 80 },
  { value: 35 },
  { value: 15 }
];

const customersData = [
  { value: 100 },
  { value: 90 },
  { value: 80 },
  { value: 35 },
  { value: 90 },
  { value: 25 }
];

const dashboardCharts = document.querySelector('.dashboard__charts');

dashboardCharts.append(
  new ColumnChart(ordersData, 
    {
      label: 'orders',
      value: 344,
      link: '#'
    }
  ),
  new ColumnChart(salesData, 
    {
      label: 'sales',
      value: '$243,437'
    }
  ),
  new ColumnChart(customersData, {
    label: 'customers',
    value: 321
  })
);