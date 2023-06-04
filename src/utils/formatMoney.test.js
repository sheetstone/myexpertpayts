import formatMoney from "./formatMoney";

describe("Test Format Function", () => {
    const testAmount = [
      123.5578,
      123,
      0.123,
      1251232.123,
    ];
  
    const testResult = [
      "$123.56",
      "$123.00",
      "$0.12",
      "$1,251,232.12"
    ];
  
    it("should test format function", () => {
        testAmount.forEach((item, i) => {
        expect(formatMoney(item)).toBe(testResult[i]);
      });
    });
  
  });
  