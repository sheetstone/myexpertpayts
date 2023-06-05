/*
 * Payment List
 */
import classes from "./paymentList.module.scss";

import PaymentItem from "../PaymentItem/paymentItem";
import { PaymentInterface } from "api/payment";

export default function PaymentList(props: {
  paymentData: PaymentInterface[];
}) {
  const { paymentData } = props;

  return (
    <ul className={classes.paymentList}>
      {paymentData.map((item, i) => (
        <PaymentItem paymentData={item} key={`paymentID${i.toString()}`} />
      ))}
    </ul>
  );
}
