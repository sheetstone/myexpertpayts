import React from 'react';
import { render } from '@testing-library/react';
import ReceiveChart from './receiveChart';

describe('ReceiveChart component', () => {
  const paymentData = [
    {
      name: "John Doe",
      bank: "Bank A",
      casenumber: "123",
      amount: 1000,
      type: 1,
      catgory: "Category 1",
      id: 1,
      paymentdate: "12-12-2023",
      status: 1,
    },
    {
      name: "Jane Smith",
      bank: "Bank B",
      casenumber: "456",
      amount: 2000,
      type: 2,
      catgory: "Category 2",
      id: 2,
      paymentdate: "12-12-2023",
      status: 2,
    },
    {
      name: "Bob Johnson",
      bank: "Bank C",
      casenumber: "789",
      amount: 1500,
      type: 3,
      catgory: "Category 3",
      id: 3,
      paymentdate: "12-12-2023",
      status: 3,
    },
    {
      name: "Alice Lee",
      bank: "Bank D",
      casenumber: "012",
      amount: 500,
      type: 4,
      catgory: "Category 3",
      id: 4,
      paymentdate: "12-12-2023",
      status: 4,
    },
  ];

  it('renders chart with correct data', () => {
    const type = 'recieved';
    const chartType = 1;

    const { getByTestId } = render(<ReceiveChart chartType={chartType} dashboardType={type} paymentData={paymentData} />);
    const chart = getByTestId('chart');
    expect(chart).toBeInTheDocument();
  });

  it('it should render when dashboard type as sent', () => {
    const type = 'sent';
    const chartType = 2;

    const { getByTestId } = render(<ReceiveChart chartType={chartType} dashboardType={type} paymentData={paymentData} />);
    const chart = getByTestId('chart');
    expect(chart).toBeInTheDocument();
  });

  it('it should render when dashboard type as casenumber', () => {
    const type = 'recieved';
    const chartType = 3;

    const { getByTestId } = render(<ReceiveChart chartType={chartType} dashboardType={type} paymentData={paymentData} />);
    const chart = getByTestId('chart');
    expect(chart).toBeInTheDocument();
  });

  it('it should render when dashboard type as catgory', () => {
    const type = 'recieved';
    const chartType = 4;

    const { getByTestId } = render(<ReceiveChart chartType={chartType} dashboardType={type} paymentData={paymentData} />);
    const chart = getByTestId('chart');
    expect(chart).toBeInTheDocument();
  });

  it('it should render with nagtive case', () => {
    const type = '';
    const chartType = 0;

    const { getByTestId } = render(<ReceiveChart chartType={chartType} dashboardType={type} paymentData={paymentData} />);
    const chart = getByTestId('chart');
    expect(chart).toBeInTheDocument();
  });
});


