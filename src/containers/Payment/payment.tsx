/*
 * Payment List
 */
import DatePicker from "components/UI/DatePicker/datePicker";
import LoadingIndicator from "components/UI/LoadingIndicator/LoadingIndicator";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";

import { PaymentInterface, getPayments } from "api/paymentApi";
import moment from "moment";
import PaymentList from "./component/PaymentList/paymentList";
import messages from "./messages";
import style from "./payment.module.scss";

export default function Payment(props: {}) {
  const [startDate, setStartDate] = useState(moment().subtract(3, "months"));
  const [endDate, setEndDate] = useState(moment());
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<PaymentInterface[]>([]);

  useEffect(() => {
    reloadState();
  }, []);

  const reloadState = async () => {
    getPayments()
      .then((res) => {
        setPaymentData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDateChange = (val: any, name: string): void => {
    if (name === "startData") {
      setStartDate(val);
    } else {
      setEndDate(val);
    }
  };

  return (
    <article className={style.bankaccountbg}>
      <Helmet>
        <title>Payment Activity</title>
        <meta name="description" content="My Expertpay" />
      </Helmet>
      <Container>
        <h1 className={style.pageheader}>
          <FormattedMessage {...messages.header} />
        </h1>
        <hr />
        <Row>
          <Col md="auto">
          <DatePicker
            name="startData"
            label="Start Date"
            id="startDate"
            value={moment(startDate).format("MMMM-DD-YYYY")}
            onValueChange={handleDateChange}
          />
          <DatePicker
            name="endDate"
            label="End Date"
            id="endDate"
            value={moment(endDate).format("MMMM-DD-YYYY")}
            onValueChange={handleDateChange}
          /></Col>
          <Col>

          </Col>
          <Col md="auto" className={style.verticalCenter}>
          <Button variant="primary" >
            Send Money
          </Button>

          <Button variant="primary" >
            Request Money
          </Button>
          </Col>
        </Row>
        <hr />

        {isLoading && <LoadingIndicator />}
        {!isLoading && <PaymentList paymentData={paymentData} />}
      </Container>
    </article>
  );
}
