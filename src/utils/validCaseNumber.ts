import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import * as yup from 'yup'
/**
 * Validate the input is a case number
 */

/* 
  Case number logic: 
  Case number start with 0-5 Char, 
  Follow with a dash,
  and follow with 4-10 numbers,
  and the length of entire case number is 11 charactor less.
 */

export default function validCaseNumber(this: yup.StringSchema, msg:string,casenumber: string):yup.StringSchema {
  return this.test('casenumber',msg, function (this:any, input: any){
    if (input.length >= 15) {
      return false;
    }

    let reg = /^[A-Za-z]{0,5}-?\d{4,9}$/m;
    let result = reg.test(input);

    // TODO: There should have some ascyn function to check Casenum is valid or not
    return result;
  })

}
