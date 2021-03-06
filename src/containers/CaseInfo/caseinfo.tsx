/*
 * Case Infor
 */
import React from "react";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Container } from "react-bootstrap";

import AddNewCase from "./AddNewCase/addNewCase";
import CasesList from "./CasesList/caseslist";
import classes from "./caseinfo.module.scss";
import messages from "./messages";
import { CaseContextProvider } from "api/case/case.store";

export default function CaseInfo(props: any) {
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
        <CaseContextProvider>
          <Routes>
            <Route path="" element={<CasesList />} />
            <Route path="addnewcase" element={<AddNewCase />} />
            <Route path="editcase" element={<AddNewCase />} />
          </Routes>
        </CaseContextProvider>
      </Container>
    </article>
  );
}
