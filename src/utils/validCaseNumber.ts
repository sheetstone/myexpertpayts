import * as yup from "yup";

/**
 * Validates whether the input is a valid case number.
 * A valid case number starts with 0-5 characters, followed by a dash,
 * and then followed by 4-10 numbers. The entire case number should be 11 characters or less.
 * 
 * @param input - The input to be validated as a case number.
 * @returns A boolean indicating whether the input is a valid case number or not.
 */

export function validCaseNumber(this: any, input: string):boolean {
  if (input.length >= 15) {
    return false;
  }

  let reg = /^[A-Za-z]{0,5}-?\d{4,9}$/m;
  let result = reg.test(input);

  // TODO: There should have some ascyn function to check Casenum is valid or not
  return result;
}

export default function validCaseNumberSchema(
  this: yup.StringSchema,
  msg: string,
  casenumber: string
): yup.StringSchema {
  return this.test("casenumber", msg, validCaseNumber as yup.TestFunction<string|undefined>);
}
