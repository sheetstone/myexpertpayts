/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from "react";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage/Homepage";
import BankAccount from "./BankAccount/bankAccount";
import CaseInfo from "./CaseInfo/caseinfo";
import Recipients from "./Recipients/recipients";
import Payment from "./Payment/payment"
//import Payment from 'containers/Payment/Loadable';
//import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";

export default function App() {
  return (
    <>
      <Helmet titleTemplate="%s - MyExpertPay" defaultTitle="MyExpertPay">
        <meta name="description" content="My ExpertPay" />
      </Helmet>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        {/*<Route path="/bankaccount" element={<BankAccount />} />
        <Route path="/caseinfo" element={<CaseInfo />} />
        <Route path="/recipients" element={<Recipients />} />
        <Route path="/payment" element={<Payment />} />
         <Route path="/" component={NotFoundPage} />
        */}
      </Routes>
      <Footer />
    </>
  );
}
