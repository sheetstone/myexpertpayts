import React from "react";
import { Form } from "react-bootstrap";

import FormValidationError from "components/Form/formValidationError/formValidationError";
import Popoverbox from "components/UI/popover/Popover";
import classes from "../addNewCase.module.scss";
import { string } from "yup";

interface CaseInputType {
  objkey: string,
  value: any,
  errors: any,
  addChild: Function,
  removeChild: Function,
  isTail: Boolean,
  isChild: Boolean
}

const CaseInput = ({
  objkey,
  value,
  errors,
  addChild,
  removeChild,
  isTail,
  isChild,
}:CaseInputType) => {

  if (isChild) {
    return (
      <Form.Group
        controlId={objkey}
        className={isTail ? classes.indentTail : classes.indent}
      >
        <Form.Control {...value} name={objkey} className={classes.caseChildInput} />
        <button
          onClick={()=>addChild()}
          className={classes.addBtn}
          title="Add child"
          type="button"
        ></button>
        <button
          onClick={()=>removeChild()}
          className={classes.removeBtn}
          title="Delete"
          type="button"
        ></button>
        <FormValidationError formEle={objkey} errors={errors} />
      </Form.Group>
    );
  }
  return (
    <Form.Group controlId={objkey} className={classes.caseInputGroup}>
      <Form.Control {...value} />
      <FormValidationError formEle={objkey} errors={errors} />
      {value.tooltip && !value.isValid ? (
        <Popoverbox tooltip={value.tooltip} isValid={value.isValid} />
      ) : null}
    </Form.Group>
  );
};

export default CaseInput;
