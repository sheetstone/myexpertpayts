import { PaymentType, PaymentInterface } from "api/payment";
/**
   * Returns an array of key-value pairs for the given key and payment type.
   * @param key - The key to group the payment data by.
   * @param type - The type of payment to filter by.
   * @returns An array of key-value pairs representing the payment data grouped by the given key.
   * @example
   * [
   *  ['bank', 'Amount']
   *  ['Bank A', 1000],
   *  ['Bank B', 2000],
   *  ['Bank C', 1500],
   *  ['Bank D', 500],
   * ]
   */
export const getChartDataByKey = (
    paymentData: PaymentInterface[],
    key: "name" | "bank" | "casenumber" | "catgory",
    type: PaymentType
  ): [string, string | number][] => {
    const summaryMap = new Map<string, number>();
    const tableHeader: [string, string | number][] = [[key, "Amount"]];

    if (paymentData.length === 0) return [];
    for (const payment of paymentData) {
      if (payment[key] !== undefined && payment.type === type) {
        const keyName = payment[key] as string;
        if (summaryMap.has(keyName)) {
          summaryMap.set(
            keyName,
            summaryMap.get(keyName)! +
              (typeof payment.amount === "string"
                ? parseFloat(payment.amount)
                : payment.amount)
          );
        } else {
          summaryMap.set(
            keyName,
            typeof payment.amount === "string"
              ? parseFloat(payment.amount)
              : payment.amount
          );
        }
      }
    }
    return tableHeader.concat(Array.from(summaryMap.entries()));
  }