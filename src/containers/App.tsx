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
import { AuthGuard } from "../api/auth/authGuard";
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import BankAccount from "./BankAccount/bankAccount";
import CaseInfo from "./CaseInfo/caseinfo";
import HomePage from "./HomePage/Homepage";
import Login from "./Login/login";
import Payment from "./Payment/payment";
import Recipients from "./Recipients/recipients";

export default function App() {
  return (
    <AuthContextProvider>
      <Helmet titleTemplate="%s - MyExpertPay" defaultTitle="MyExpertPay">
        <meta name="description" content="My ExpertPay" />
      </Helmet>

      <Header />
      <Routes>
        {
          // Not required to be logged in page
        }
        <Route path="/login" element={<Login />} />

        {
          // Required to be logged in page
        }
        <Route
          path="/"
          element={
            <AuthGuard>
              <HomePage />
            </AuthGuard>
          }
        />
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
      <Footer />
    </AuthContextProvider>
  );
}
