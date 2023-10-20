import {
  PaymentInterface,
  PaymentStatus,
  PaymentTypeText,
  PaymentType,
} from "api/payment";
import { Button } from "react-bootstrap";
import style from "./paymentItem.module.scss";
import formatMoney from "utils/formatMoney";
import moment from "moment";

export default function PaymentItem(props: { paymentData: PaymentInterface }) {
  const { paymentData } = props;

  function statusCheck(status: PaymentStatus) {
    return (
      status === PaymentStatus.InProgress ? (
        <>
          <Button variant="primary" size="sm" className="mx-2">Send</Button>
          <Button variant="secondary" size="sm" className="mx-2">Decline</Button>
        </>
      ):null
    );
  }

  function typeCheck(type: PaymentType) {
    return (
      <span className={style.typeVerification}>{PaymentTypeText[type]}</span>
    );
  }

  return (
    <li className={style.paymentItem}>
      <div className={style.paymentData}>
        {moment(paymentData.paymentdate).format("DD/MM/YYYY")}
      </div>
      <div className={style.paymentName}>
        {paymentData.name}
        <div className={style.paymentType}>
          {typeCheck(paymentData.type)}
        </div>
      </div>

      <div className="my-auto">
        {statusCheck(paymentData.status)}
      </div>

      <div className={style.paymentAmount}>
        {formatMoney(paymentData.amount)}
      </div>
    </li>
  );
}
