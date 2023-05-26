/*
 * Payment List
 */
import DatePicker from "components/UI/DatePicker/datePicker";
import LoadingIndicator from "components/UI/LoadingIndicator/LoadingIndicator";
import MultiSelectComponent from "components/UI/MultypleSelect";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";

import { PaymentInterface, getPayments, PaymentStatus, PaymentStatusText } from "api/payment";
import moment from "moment";
import PaymentList from "./PaymentList/paymentList";
import messages from "./messages";
import style from "./payment.module.scss";
import { text } from "stream/consumers";

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

  const paymentEntries = PaymentStatusText.map((value, index):[string, number] => {
    console.log(value)
    return [value, index]
  });

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
          /></Col>
          <Col className={style.verticalCenter}>
            {/*<!--Pass a enum type with all the status and filter the payment list base on the user selection -->*/
              <MultiSelectComponent entries={paymentEntries}/>
            }
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
