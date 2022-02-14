import * as yup from 'yup'
import validCaseNumberSchema from 'utils/validCaseNumber'
import { yupResolver } from '@hookform/resolvers/yup'

import { Child } from "api/case/case.store";

declare module 'yup' {
  interface StringSchema {
    caseNumberString(msg?: string) : this;
  }
}

yup.addMethod<yup.StringSchema>(yup.string, 'caseNumberString', validCaseNumberSchema)

export const schema = yup.object().shape({ 
  caseNumber: yup
    .string()
    .required('Case Number is required')
    .min(6, 'Case Number is too short')
    .max(15, 'Case Number is too long')
    .caseNumberString('Not a valid Case Number'),
  ncpName: yup.string(),
  childName: yup.string()
}) 
export const formSettings = {
  mode: 'onBlur',
  reValidateMode: 'onChange',
  resolver: yupResolver(schema),
  criteriaMode: 'firstErrorDetected',
  shouldFocusError: true,
  shouldUnregister: false
}

/*
* Add Validation into Case add form
*/
export const formCreator = (register:Function, formState:any, initalState:any, errors:any) => {
  return {
    caseNumber: {
      type: 'text',
      name: 'caseNumber',
      ...register('caseNumber'),
      placeholder: 'Case Number',
      isValid: formState.touchedFields.caseNumber && errors && !errors.caseNumber,
      isInvalid: formState.touchedFields.caseNumber && errors && errors.caseNumber,
      defaultValue: initalState && initalState.caseNumber,
      disabled: initalState && true,
      tooltip: {
        title: 'Case Number',
        content: (
          <>
            You can find your case number from the back of your case card:
            <li>Case number start with 0-5 Char</li>
            <li>follow with a dash,</li>
            <li>follow with 4-10 numbers,</li>
            <li>
              and the length of entire case number is 11 characters or less.
            </li>
          </>
        )
      }
    },
    ncpName: {
      type: 'text',
      name: 'ncpName',
      ...register('ncpName'),
      defaultValue: initalState && initalState.ncpName,
      placeholder: 'NCP Name'
    },
    initalChildrenList: (() => {
      return initalState
        ? initalState.children.map((child:Child, index:number) => {
            return {
              type: 'text',
              ...register(`children${index}`),
              defaultValue: child,
              placeholder: 'Child Name'
            }
          })
        : [
            {
              type: 'text',
              ...register(`children0`),
              placeholder: 'Child Name'
            }
          ]
    })()
  }
}
