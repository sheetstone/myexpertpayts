import Chart from "react-google-charts";
import PropTypes from "prop-types";

import classes from "./recieveChart.module.scss";
import { PaymentInterface } from "api/payment";

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

const RecieveChart = (props: {
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

  const getChartDataByKey = (
    key: "name" | "bank" | "casenumber" | "catgory",
    sta: number
  ) => {
    const keylist: string[] = [];
    const fineddata: any[] = [[key, "Amount"]];

    if (paymentData.length === 0) return 0;
    //console.log(paymentData);
    paymentData.forEach((payment) => {
      if (
        payment[key] !== undefined &&
        !keylist.includes(payment[key] as string)
      ) {
        keylist.push(payment[key] as string);
      }
    });
    const group = keylist.map((item) => {
      let sum = 0;
      paymentData.forEach((piece) => {
        if (piece[key] === item && piece.type === sta) {
          sum += (typeof piece.amount == 'string') ? parseFloat(piece.amount): piece.amount;
        }
      });  
      return [item, sum];
    });
    console.log(group)
    return fineddata.concat(group);
  };

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

RecieveChart.propTypes = {
  dashboardType: PropTypes.oneOf(["recieved", "sent"]).isRequired,
  chartType: PropTypes.number.isRequired,
  paymentData: PropTypes.array.isRequired,
};

export default RecieveChart;
