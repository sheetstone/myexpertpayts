const bankList = [
  "Chase",
  "Bank of America",
  "Citi Bank",
  "U.S. Corp",
  "Wells Fargo",
  "PNC",
  "Capital One",
];

/*
 * Resolve should be async function, get data from API, to search the bank name with the right routine number
  * Tempraure solution is to return a random bank name from the list
  * @param data - The data to be sent in the request body
  * @returns A Promise that resolves to the JSON data from the server's response
  * @example
  * resolveBankName("123456789").then(bankName => {
  *  console.log(bankName);
  * });
 */
export default async function resolveBankName(data:string) {
  const l = bankList.length;
  const rand = Math.floor(Math.random() * l);
  return bankList[rand];
}
