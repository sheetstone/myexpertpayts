/*
 * Add/Edit Bank List
 */
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useForm, Path, UseFormRegister, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { addBank } from "api/bank/bank.api";
import validRoutin from "utils/validRoutin";
import { BankFormType } from "api/bank/bankInterface";
import * as yup from "yup";
import messages from "../messages";

import RequiredStar from "components/Form/RequiredStar/requiredStar";
import FormValidationError from "components/Form/formValidationError/formValidationError";

type BankFormProps = {
  label: Path<BankFormType>;
  register: UseFormRegister<BankFormType>;
  required: boolean;
};

const schema = yup.object().shape({
  rountingNumber: yup
    .string()
    .required("Rounting Number is required")
    .test("isRounting", "Not a valid Rounting Number", validRoutin as yup.TestFunction<string | undefined>),
  accountNumber: yup
    .string()
    .required("Account Number is required")
    .min(4, "Account Number is too short")
    .max(17, "Account Number is long"),
  confirmAccountNumber: yup
    .string()
    .required("Account Number is required")
    .min(4, "Account Number is too short")
    .max(17, "Account Number is too long")
    .test("passwords-match", "Account Number should match", function (value) {
      return this.parent.accountNumber === value;
    }),
});

type FormCheckType = "checkbox" | "radio" | "switch";

export default function EditBankAccount(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BankFormType>({
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
    resolver: yupResolver(schema)
  });

  const formElement = {
    rountingNumber: {
      type: "text",
      ...register("rountingNumber"),
    },
    accountNumber: {
      type: "text",
      ...register("accountNumber"),
    },
    confirmAccountNumber: {
      type: "text",
      ...register("confirmAccountNumber"),
    },
    accountType: {
      type: "radio" as FormCheckType,
    },
    accountTypeChecking: {
      inline: true,
      id: "accounttype-radio-checking",
      value: "checking",
      label: "Checking",
      defaultChecked: true,
      type: "radio" as FormCheckType,
      ...register("accountType"),
    },
    accountTypeSaving: {
      inline: true,
      id: "accounttype-radio-saving",
      value: "saving",
      label: "Saving",
      type: "radio" as FormCheckType,
      ...register("accountType"),
    },
  };

  const { show } = props;
  useEffect(() => {
    reset({
      rountingNumber: "",
      accountNumber: "",
      confirmAccountNumber: "",
    });
  }, [show, reset]);

  const onSubmit: SubmitHandler<BankFormType> = (data: any) => {
    console.log("Submitting:" + JSON.stringify(data));
    addBank(data).then((res) => {
      props.reloadState();
      props.onHide();
    });
  };

  const { Group, Control, Label, Check } = Form;
  const Text = FormattedMessage;

  const Input = ({ label, register, required }: BankFormProps) => (
    <Group controlId={label}>
      <Label>
        <Text {...messages[label]} />
        {required?<RequiredStar />:null}
      </Label>
      <Control {...formElement[label]} className={errors[label]?'is-invalid':''}/>
      <FormValidationError formEle={label} errors={errors} />
    </Group>
  );

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Text {...messages.addBankTitle} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col>
              <Input label="rountingNumber" register={register} required />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Input label="accountNumber" register={register} required /> 
            </Col>
            <Col>
              <Input label="confirmAccountNumber" register={register} required />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Check {...formElement.accountTypeChecking} />
              <Check {...formElement.accountTypeSaving} />
            </Col>
          </Row>
          <hr />
          <div>
            <Text {...messages.addBankMessage} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit" name="submit">
            <Text {...messages.addBankSubmit} />
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
