/*
 * Bank Account
 */
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { Container } from "react-bootstrap";

import BankAccountContainer from "./bankAcountContainer";
import { BankContextProvider } from "api/bank/bank.store";

import classes from "./bankAccount.module.scss";
import messages from "./messages";

const BankAccount = () => {
  return (
    <article className={classes.bankaccountbg}>
      <Helmet>
        <title>Bank Account</title>
        <meta name="description" content="My Expertpay" />
      </Helmet>

      <BankContextProvider>
        <Container>
          <h1 className={classes.pageheader}>
            <FormattedMessage {...messages.header} />
          </h1>
          <hr />
          <p className={classes.pageScaffoldingHeader}>
            <FormattedMessage {...messages.scaffoldingHeader} />
          </p>
          <BankAccountContainer />
        </Container>
      </BankContextProvider>
    </article>
  );
};

export default BankAccount;
