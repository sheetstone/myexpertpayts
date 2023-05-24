/*
 * Payment Item
 */
import style from "./paymentItem.module.scss";
import { PaymentInterface } from "api/paymentApi";

function labelActive() {
  return <span className={style.labelActive}>Active</span>;
}

// To be implemented
function statusCheck(status?: number) {
  return <span className={style.labelVerification}>Require Verification</span>;
}

export default function PaymentItem(props: {paymentData:PaymentInterface}) {
  const { paymentData } = props;
  return (
    <li className={style.paymentItem}>
      <div className={style.paymentData}>{paymentData.paymentdate}</div>
      <div className={style.paymentName}>{paymentData.name}</div>
      <div className={style.paymentStatus}>
        {statusCheck(paymentData.status)}
      </div>
      {/*<div className={style.paymentcase}>{paymentData.casenumber}</div>
      <div className={style.paymentcatgory}>{paymentData.catgory}</div>*/}
      <div className={style.paymentAmount}>{paymentData.amount}</div>
    </li>
  );
}
