/*
 * Case Infor
 */
import React from 'react'
import { Helmet } from 'react-helmet'
import { Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'

import AddNewRecipient from './AddNewRecipient/addNewRecipient'
import RecipientList from './RecipientList/recipientList'
import classes from './recipients.module.scss'

export default function Recipients (props) {

  return (
    <article className={classes.recipientsbg}>
      <Helmet>
        <title>Recipients</title>
        <meta name='description' content='My Expertpay' />
      </Helmet>
      <Container>
        <Routes>
          <Route exact path="" element={<RecipientList />} />
          <Route
            path="addnewrecipient"
            element={<AddNewRecipient />}
          />
          <Route
            path="editrecipient"
            component={<AddNewRecipient />}
          />
        </Routes>
      </Container>
    </article>
  )
}
