import Chart from "react-google-charts";
import PropTypes from "prop-types";

import classes from "./receiveChart.module.scss";
import { PaymentInterface, PaymentType } from "api/payment";

// with google-charts;
const options = {
  title: " ",
  colors: [
    "#b2a0bb",
    "#ddc2ba",
    "#72bfb3",
    "#759992",
    "#D9B797",
    "#D7C4C9",
    "#BFAAC9",
    "#82ABDB",
  ],
  pieHole: 0.4,
  is3D: false,
};

const ReceiveChart = (props: {
  dashboardType: "recieved" | "sent";
  chartType: number;
  paymentData: PaymentInterface[];
}) => {
  const { dashboardType, chartType, paymentData } = props;

  const getChartData = () => {
    let type;
    switch (dashboardType) {
      case "recieved":
        type = 0;
        break;
      case "sent":
        type = 1;
        break;
      default:
        type = 0;
    }
    switch (chartType) {
      case 1: // Recipent selected
        return getChartDataByKey("name", type);
      case 2: // Bank selected
        return getChartDataByKey("bank", type);
      case 3: // Case selected
        return getChartDataByKey("casenumber", type);
      case 4: // Categoray selected
        return getChartDataByKey("catgory", type);
      default:
        break;
    }
  };

  /**
   * Returns an array of key-value pairs for the given key and payment type.
   * @param key - The key to group the payment data by.
   * @param type - The type of payment to filter by.
   * @returns An array of key-value pairs representing the payment data grouped by the given key.
   * @example
   * [
   *  ['bank', 'Amount']
   *  ['Bank A', 1000],
   *  ['Bank B', 2000],
   *  ['Bank C', 1500],
   *  ['Bank D', 500],
   * ]
   */
  function getChartDataByKey(
    key: "name" | "bank" | "casenumber" | "catgory",
    type: PaymentType
  ): [string, string | number][] {
    const summaryMap = new Map<string, number>();
    const tableHeader: [string, string | number][] = [[key, "Amount"]];

    if (paymentData.length === 0) return [];
    for (const payment of paymentData) {
      if (payment[key] !== undefined && payment.type === type) {
        const keyName = payment[key] as string;
        if (summaryMap.has(keyName)) {
          summaryMap.set(
            keyName,
            summaryMap.get(keyName)! +
              (typeof payment.amount === "string"
                ? parseFloat(payment.amount)
                : payment.amount)
          );
        } else {
          summaryMap.set(
            keyName,
            typeof payment.amount === "string"
              ? parseFloat(payment.amount)
              : payment.amount
          );
        }
      }
    }
    return tableHeader.concat(Array.from(summaryMap.entries()));
  }

  return (
    <div>
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={getChartData()}
        options={options}
        className={classes.Piechart}
      />
    </div>
  );
};

ReceiveChart.propTypes = {
  dashboardType: PropTypes.oneOf(["recieved", "sent"]).isRequired,
  chartType: PropTypes.number.isRequired,
  paymentData: PropTypes.array.isRequired,
};

export default ReceiveChart;
