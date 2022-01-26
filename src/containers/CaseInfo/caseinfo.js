/*
 * Case Infor
 */
import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Container } from "react-bootstrap";

import AddNewCase from "./AddNewCase/addNewCase";
import CasesList from "./CasesList/caseslist";
import classes from "./caseinfo.module.scss";
import messages from "./messages";

export default function CaseInfo(props) {
  return (
    <article className={classes.caseinfobg}>
      <Helmet>
        <title>Case Info</title>
        <meta name="description" content="My Expertpay" />
      </Helmet>
      <Container>
        <h1 className={classes.pageheader}>
          <FormattedMessage {...messages.header} />
        </h1>
        <hr />
        <Switch>
          <Route exact path="" element={<CasesList />} />
          <Route path="addnewcase" element={<AddNewCase />} />
          <Route path="editcase" element={<AddNewCase />} />
        </Switch>
      </Container>
    </article>
  );
}
