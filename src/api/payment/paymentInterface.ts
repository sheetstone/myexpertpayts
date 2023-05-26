/**
 * 
 * @interface PaymentInterface
 * @property {number} amount
 * @property {string} bank
 * @property {string} casenumber
 * @property {string} catgory
 * @property {number} id
 * @property {string} name
 * @property {string} paymentdate
 * @property {number} status
 * @example
 * {
 * "amount": 1000,
 * "bank": "SBI",
 * "casenumber": "123456789",
 * "catgory": "Food",
 * "id": 1,
 * "name": "Raj",
 * "paymentdate": "2021-05-05",
 * "status": 1
 * }
 */
export interface PaymentInterface {
    amount: number;
    bank: string;
    casenumber: string;
    catgory: string;
    id: number;
    name: string;
    paymentdate: string;
    status: PaymentStatus;
  }

  export enum PaymentStatus {
    Accepted = 1,
    Canceled = 2,
    Completed = 3,
    Expired = 4,
    InProgress = 5,
    Rejected = 6,
    Returned = 7,
    ReversalCompleted = 8,
    ReversalFailed = 9,
    ReversalInitiated = 10,
  }

  export const PaymentStatusText = [
    'Accepted',
    'Canceled',
    'Completed',
    'Expired',
    'In Progress',
    'Rejected',
    'Returned',
    'Reversal Completed',
    'Reversal Failed',
    'Reversal Initiated',
  ]

  