import { useState, useMemo } from "react";
import classes from "./paymentList.module.scss";
import PaymentItem from "../PaymentItem/paymentItem";
import { PaymentInterface } from "api/payment";
import PaginationBasic from "components/UI/Pagniation/pagination";

export default function PaymentList(props: {
  paymentData: PaymentInterface[];
}) {
  const { paymentData } = props;
  const [ currentPage, setCurrentPage] = useState(1);
  const MAX_ITEMS_PER_PAGE = 10;

  const pagedPaymentData: PaymentInterface[] = useMemo(
    ()=> paymentData.length>0?paymentData.slice(0+MAX_ITEMS_PER_PAGE*(currentPage-1), MAX_ITEMS_PER_PAGE*currentPage):[]
    , [paymentData, currentPage]);

  const pages = useMemo(()=>Math.ceil(paymentData.length/MAX_ITEMS_PER_PAGE), [paymentData]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  return (
    <>
      <ul className={classes.paymentList}>
        {paymentData && paymentData.length === 0 && (
          <li className={classes.noPayment}>No payment found.</li>
        )}
        {
          pagedPaymentData.length > 0 &&
          pagedPaymentData.map((item, i) => (
            <PaymentItem paymentData={item} key={`paymentID${i.toString()}`} />
          ))}
          {
            pagedPaymentData.length >= 0 && pages>1 &&(
              <div className="mt-2 d-flex justify-content-end">
                <PaginationBasic currentPage={currentPage} pages={pages} emitCurrentPage={handlePageChange}/>
              </div>
            )
          }
      </ul>

    </>
  );
}
