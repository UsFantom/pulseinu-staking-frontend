import React from 'react';

import { Chart } from 'react-google-charts';

export const data = [
  ['Distribution', 'Percent'],
  ['LIQUIDITY', 53],
  ['STAKES', 19],
  ['BURNS', 28]
];

export const options = {
  title: '',
  legend: 'none',
  backgroundColor: { fill: 'transparent' }
};

export function PulseInuPieChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={'100%'}
      style={{ background: 'transparent' }}
    />
  );
}
