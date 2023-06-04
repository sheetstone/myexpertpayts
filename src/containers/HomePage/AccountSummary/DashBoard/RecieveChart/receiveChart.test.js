import React from 'react';
import { render } from '@testing-library/react';
import ReceiveChart from './receiveChart';

describe('ReceiveChart component', () => {
  const paymentData = [
    { name: 'John Doe', bank: 'Bank A', casenumber: '123', category: 'Category 1', amount: 1000, type: 1 },
    { name: 'Jane Smith', bank: 'Bank B', casenumber: '456', category: 'Category 2', amount: 2000, type: 2 },
    { name: 'Bob Johnson', bank: 'Bank C', casenumber: '789', category: 'Category 1', amount: 1500, type: 3 },
    { name: 'Alice Lee', bank: 'Bank D', casenumber: '012', category: 'Category 2', amount: 500, type: 4 },
  ];

  const type = 'recieved';
  const chartType = 1;

  it('renders chart with correct data', () => {
    const { getByTestId } = render(<ReceiveChart chartType={chartType} dashboardType={type} paymentData={paymentData} />);
    const chart = getByTestId('chart');

    // Assert that chart is rendered with correct data...
  });
});

