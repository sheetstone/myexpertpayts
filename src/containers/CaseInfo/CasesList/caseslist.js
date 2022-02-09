/*
 * Add New Cases
 */
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { Row, Col, Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCase } from "api/case/case.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LoadingIndicator from "components/UI/LoadingIndicator/LoadingIndicator";
import Confirm from "components/UI/Confirm/Confirm";

import classes from "./caseslist.module.scss";

const header = ["Case Number", "NCP Name", "Children Name", "Action"];

const CasesList = () => {
  const {caseData, loadCase, deleteCase } = useCase([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    if (caseData && caseData.length === 0){
      setIsLoading(true);
      loadCase().then(stat=>{
        if(stat.success){
          setIsLoading(false);
        }
      });
    }
  }, [])

  const onEditClicked = (key, item, e) => {
    navigate("editcase", {state:{
      key: key,
      case: {...item},
    }});
  };

  const onDeleteClicked = async (key) => {
    console.log("trying to delete", key);
    await deleteCase(key);
    await loadCase();
  };

  const CasesListRow = () =>{
    const casesListRow = [];
    const childColWidth = {
      width: "446px", //TODO: responsive design for this value.
    };
    for (const [key, item] of Object.entries(caseData)) {
      const { caseNumber, ncpName, children } = item;
      casesListRow.push(
        <tr key={key}>
          <td>{caseNumber}</td>
          <td>{ncpName}</td>
          <td className={classes.childrenCol}>
            <div className={classes.childrenWrap} style={childColWidth}>
              {children.join(", ")}
            </div>
          </td>
          <td>
            <Button
              variant="link"
              size="sm"
              onClick={(e) => onEditClicked(key, item, e)}
            >
              Edit
            </Button>
            <Confirm
              title="Delete action Confirmation"
              description="Are you sure to delete this case?"
            >
              {(confirm) => (
                <Button
                  variant="link"
                  size="sm"
                  onClick={(e) => confirm(() => onDeleteClicked(key), e)}
                >
                  Delete
                </Button>
              )}
            </Confirm>
          </td>
        </tr>
      );
    }
    return casesListRow;
  }

  const CasesListTable = () => (
    <>
      <Row>
        <Col>
          <Link to="addnewcase">
            <Button variant="primary" size="md">
              <FontAwesomeIcon icon={faPlus} color="#ffffff" />
              &nbsp;Add New case
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className={classes.tableWrapRow}>
        <Col className={classes.tableWrapCol}>
          <Table hover className={classes.casesTable}>
            <thead>
              <tr>
                {header.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody><CasesListRow /></tbody>
          </Table>
        </Col>
      </Row>
    </>
  );

  return (
    <article className={classes.bankaccountbg}>
      <Helmet>
        <title>Case Info - Add new case</title>
        <meta name="description" content="My Expertpay" />
      </Helmet>

      {isLoading && <LoadingIndicator />}
      {!isLoading && <CasesListTable />}
    </article>
  );
};

export default CasesList;
