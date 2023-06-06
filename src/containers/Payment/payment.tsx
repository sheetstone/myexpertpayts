/*
 * Payment List
 */
import DatePicker from "components/UI/DatePicker/datePicker";
import LoadingIndicator from "components/UI/LoadingIndicator/LoadingIndicator";
import MultiSelectComponent from "components/UI/MultypleSelect";
import { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";

import {
  PaymentInterface,
  getPayments,
  PaymentStatusText,
  PaymentStatus,
} from "api/payment";
import moment from "moment";
import PaymentList from "./PaymentList/paymentList";
import messages from "./messages";
import style from "./payment.module.scss";
import { stat } from "fs";

export default function Payment(props: {}) {
  const [startDate, setStartDate] = useState<moment.Moment>(moment().subtract(3, "months"));
  const [endDate, setEndDate] = useState<moment.Moment>(moment());
  const [statusSelected, setStatusSelected] = useState<number[]>(
    Object.values(PaymentStatus).filter(
      (item) => typeof item === "number"
    ) as number[]
  ); // By default select all the status
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

  const handleDateChange = (val: moment.Moment, name: string): void => {
    if (name === "startData") {
      setStartDate(moment(val));
    } else {
      setEndDate(moment(val));
    }
  };

  const handleStatusChange = (val: number[]): void => {
    setStatusSelected(val.sort());
  };

  const paymentEntries = PaymentStatusText.map(
    (value, index): [string, number] => {
      return [value, index + 1];
    }
  );


  const filteredPayment = useMemo(() => {
    return paymentData.filter((payment) => {
      return statusSelected?.includes(payment.status) && moment(payment.paymentdate).isBetween(startDate, endDate, undefined, '[]');
    });
  }, [paymentData, statusSelected, startDate, endDate]);

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
            {/*<!--TODO: Filter payment list on user selection*/}
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
            />
          </Col>
          <Col>
            {
              /*<!--Pass a enum type with all the status and filter the payment list base on the user selection -->*/
              <MultiSelectComponent
                entries={paymentEntries}
                emitValue={handleStatusChange}
              />
            }
          </Col>
          <Col md="auto" className={style.verticalCenter}>
            <Button variant="primary">Send Money</Button>

            <Button variant="primary">Request Money</Button>
          </Col>
        </Row>

        {isLoading && <LoadingIndicator />}
        {!isLoading && <PaymentList paymentData={filteredPayment} />}
      </Container>
    </article>
  );
}
