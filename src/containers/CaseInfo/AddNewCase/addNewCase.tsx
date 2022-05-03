/*
 * Add New Cases
 */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Row, Col, Button, Form } from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup'
import { useCase, Case, CaseFormType } from "api/case/case.store";
import { formCreator, schema } from "./caseForm";

import SuccessModal from "components/UI/SuccessModal/successModal";
import CaseInput from "./CaseInput/caseInput";
import { useLocation, useNavigate, Location } from "react-router-dom";

export interface LocationState {
  key: string;
  case: Case; 
}

const AddNewCase = () => {
  const location: Location = useLocation();
  const navigation = useNavigate();
  const updateKey = (location.state as LocationState)?.key;
  const initalState = (location.state as LocationState)?.case;
  const { addCase, updateCase } = useCase([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    control,
    reset,
  } = useForm<CaseFormType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
    defaultValues:{
      children:['sss']
    }
  });
  const { fields, append, remove } = useFieldArray<CaseFormType>({
    name: "children",
    control
  });

  const { caseNumber, ncpName, initalChildrenList } = formCreator(
    register,
    formState,
    initalState,
    errors
  );
  //const [childrenName, setChildrenName] = useState(initalChildrenList);
  const [showSuccess, setShowSuccess] = useState(false);

  /*useEffect(() => {
    if (initalState) {
      const childrenObj: any = {};
      initalState.children.map((child, i) => {
        childrenObj["children" + i] = child;
      });
      reset({
        caseNumber: initalState.caseNumber,
        ncpName: initalState.ncpName,
        ...childrenObj,
      });
    }
  }, [reset]);*/

  /*const addChildHandler = () => {
    setChildrenName((prevEle) => {
      return prevEle.concat({
        type: "text",
        ...register(`children${prevEle.length}`),
        placeholder: "Child Name",
      });
    });
  };

  const removeChildHandler = (index: number) => {
    setChildrenName((prevEle) => {
      if (prevEle.length === 1) {
        return prevEle;
      }
      prevEle.splice(index, 1);
      return [...prevEle];
    });
  };*/

  const formElementNode = () => {
    const formArray = [];
    formArray.push(
      <CaseInput
        objkey="caseNumber"
        value={caseNumber}
        errors={errors}
        key="caseNumber"
      />
    );
    formArray.push(
      <CaseInput
        objkey="ncpName"
        value={ncpName}
        errors={errors}
        key="ncpName"
      />
    );
    formArray.push(
      fields.map((field, index) => {
        return (
          <input 
          key={field.id}
            {...register(`children.${index}`)}
          />
        )
      })
    )
    /*formArray.push(
      childrenName.map((item, i, arr) => {

        return (
          <CaseInput
            objkey={kidId}
            isChild
            isTail={arr.length - 1 === i}
            value={item}
            errors={errors}
            key={kidId}
            addChild={()=>append({''})}
            removeChild={() => remove(i)}
          />
        );
      })
    );*/
    return formArray;
  };

  const gotoCaseInfo = () => {
    navigation("/caseinfo");
  };

  const resetForm = () => {
    //setChildrenName(initalChildrenList);
    reset({
      caseNumber: "",
      ncpName: "",
      children: [],
    });
    setShowSuccess(false);
  };

  const onSubmit: SubmitHandler<CaseFormType> = (data) => {
    if (updateKey) {
      // Update Exist Case
      console.log(formState.touchedFields);
      if (Object.keys(formState.touchedFields).length === 0) {
        console.log("no need update database");
        gotoCaseInfo();
      } else {
        updateCase(updateKey, data).then((res) => {
          // TODO: add a modal to comfirmation
          gotoCaseInfo();
        });
      }
    } else {
      // Add new case
      addCase(data).then((res) => {
        // console.log('Add successful',res);
        // TODO: add a modal to comfirmation
        setShowSuccess(true);
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Case Info - Add new case</title>
        <meta name="description" content="My Expertpay" />
      </Helmet>
      <Row>
        <Col xs={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {formElementNode()}
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button variant="link" type="button" onClick={gotoCaseInfo}>
              Cancel
            </Button>
            <Button variant="link" type="button" onClick={()=>append("")}>
              Add
            </Button>
            <SuccessModal
              show={showSuccess}
              noed={gotoCaseInfo}
              yesed={resetForm}
              title="Case Added Successful"
              body="Do you want to add more cases?"
            />
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddNewCase;
