/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import { Helmet } from "react-helmet";
import { Route, Routes } from "react-router-dom";

import { AuthContextProvider, useAuth } from "../api/auth/auth.store";
import BankAccount from "./BankAccount/bankAccount";
import CaseInfo from "./CaseInfo/caseinfo";
import HomePage from "./HomePage/Homepage";
import Payment from "./Payment/payment";
import Recipients from "./Recipients/recipients";
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import Login from "./Login/login";

export default function App() {
  const { isLogin } = useAuth(null);
  return (
    <AuthContextProvider>
      <Helmet titleTemplate="%s - MyExpertPay" defaultTitle="MyExpertPay">
        <meta name="description" content="My ExpertPay" />
      </Helmet>

      {isLogin && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bankaccount" element={<BankAccount />} />
        <Route path="/caseinfo/*" element={<CaseInfo />} />
        <Route path="/recipients" element={<Recipients />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<p>Not Found!</p>} />
      </Routes>
      {isLogin && <Footer />}
    </AuthContextProvider>
  );
}
