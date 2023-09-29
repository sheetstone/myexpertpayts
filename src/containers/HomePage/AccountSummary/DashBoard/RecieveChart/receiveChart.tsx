import Chart from "react-google-charts";
import PropTypes from "prop-types";

import classes from "./receiveChart.module.scss";
import { PaymentInterface } from "api/payment";
import { getChartDataByKey } from "./getChartDataByKey";

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
        return getChartDataByKey(paymentData, "name", type);
      case 2: // Bank selected
        return getChartDataByKey(paymentData, "bank", type);
      case 3: // Case selected
        return getChartDataByKey(paymentData, "casenumber", type);
      case 4: // Categoray selected
        return getChartDataByKey(paymentData, "catgory", type);
      default:
        break;
    }
  };

  return (
    <div data-testid="chart">
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
