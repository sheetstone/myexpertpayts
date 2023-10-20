import React from "react";
import { Form } from "react-bootstrap";

const FormValidationError = (props) => {
  const { errors, formEle } = props;
  if (errors[formEle]) {
    return (
      <Form.Control.Feedback type="invalid">
        {errors[formEle].message}
      </Form.Control.Feedback>
    );
  }
  return null;
};

export default FormValidationError;
