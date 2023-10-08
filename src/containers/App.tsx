/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import { Helmet } from "react-helmet";
import { Route, Routes, redirect } from "react-router-dom";

import { AuthContextProvider, useAuth } from "../api/auth/auth.store";
import { AuthGuard } from "../api/auth/authenticationGuard";
import BankAccount from "./BankAccount/bankAccount";
import CaseInfo from "./CaseInfo/caseinfo";
import HomePage from "./HomePage/Homepage";
import Payment from "./Payment/payment";
import Recipients from "./Recipients/recipients";
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import Login from "./Login/login";
import { useEffect } from "react";

export default function App() {
  const { isLogin } = useAuth(null);

  return (
    <AuthContextProvider>
      <Helmet titleTemplate="%s - MyExpertPay" defaultTitle="MyExpertPay">
        <meta name="description" content="My ExpertPay" />
      </Helmet>

      {isLogin && <Header />}
      <Routes>
        {
          // Not required to be logged in page
        }
        <Route path="/login" element={<Login />} />

        {
          // Required to be logged in page
        }
        <Route path="/" element={<HomePage />} />
        <Route
          path="/bankaccount"
          element={
            <AuthGuard>
              <BankAccount />
            </AuthGuard>
          }
        />
        <Route
          path="/caseinfo/*"
          element={
            <AuthGuard>
              <CaseInfo />
            </AuthGuard>
          }
        />
        <Route
          path="/recipients"
          element={
            <AuthGuard>
              <Recipients />
            </AuthGuard>
          }
        />
        <Route
          path="/payment"
          element={
            <AuthGuard>
              <Payment />
            </AuthGuard>
          }
        />
        <Route path="*" element={<p>Not Found!</p>} />
      </Routes>
      {isLogin && <Footer />}
    </AuthContextProvider>
  );
}
