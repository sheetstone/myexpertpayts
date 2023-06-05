/*
 * Payment Item
 */
import { PaymentInterface, PaymentStatusText, PaymentStatus } from "api/payment";
import style from "./paymentItem.module.scss";

function statusCheck(status: PaymentStatus) {
  return <span className={style.labelVerification}>{PaymentStatusText[status-1]}</span>;
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

