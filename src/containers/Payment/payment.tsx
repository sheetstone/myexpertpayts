/*
 * Payment List
 */
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { Container, Button, Dropdown } from "react-bootstrap";
import LoadingIndicator from "components/UI/LoadingIndicator/LoadingIndicator";
import DatePicker from "components/UI/DatePicker/datePicker";

import { getPayments } from "api/paymentApi";
import moment from "moment";
import PaymentList from "./component/PaymentList/paymentList";
import { PaymentInterface } from "api/paymentApi";
import messages from "./messages";
import style from "./payment.module.scss";

export default function Payment(props:any) {
  const [startDate, setStartDate] = useState(moment().subtract(3, 'months'));
  const [endDate, setEndDate] = useState(moment());
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<PaymentInterface[]>([]);

  useEffect(() => {
    reloadState();
  }, [])

  const reloadState = async () => {
    getPayments()
    .then((res) => {
      setPaymentData(res);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleDateChange = (val:any, name:string):void => {
    if (name === "startData") {
      setStartDate(val)
    } else {
      setEndDate(val);
    }
  }


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
        <DatePicker
          name="startData"
          label="Start Date"
          id="startDate"
          value={moment(startDate).format('MMMM-DD-YYYY')}
          onValueChange={handleDateChange}
        />
        <DatePicker
          name="endDate"
          label="End Date"
          id="endDate"
          value={moment(endDate).format('MMMM-DD-YYYY')}
          onValueChange={handleDateChange}
        />


        <Button variant="primary" size="sm">
          Send Money
        </Button>

        <Button variant="primary" size="sm">
          Request Money
        </Button>
        <hr />

        {isLoading && <LoadingIndicator />}
        {!isLoading && <PaymentList paymentData={paymentData} />}
      </Container>
    </article>
  )
} 