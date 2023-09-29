import { getChartDataByKey } from "./getChartDataByKey";

describe("getChartDataByKey function", () => {
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
      type: 1,
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
      type: 1,
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
      type: 1,
      catgory: "Category 3",
      id: 4,
      paymentdate: "12-12-2023",
      status: 4,
    },
  ];

  it("returns chart data based on key and type", () => {
    const chartData = getChartDataByKey(paymentData, "bank", 1);

    expect(chartData).toEqual([
      ["bank", "Amount"],
      ["Bank A", 1000],
      ["Bank B", 2000],
      ["Bank C", 1500],
      ["Bank D", 500],
    ]);
  });
});
