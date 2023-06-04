/**
 * Formats a given amount of money to a currency string.
 * @param amount - The amount of money to be formatted.
 * @param locale - The locale to be used for formatting. Defaults to 'en-US'.
 * @param style - The style of currency formatting. Defaults to 'currency'.
 * @param currency - The currency to be used for formatting. Defaults to 'USD'.
 * @returns The formatted currency string.
 * @reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 */

// TODO: to colleborate with i18n locale settings
export default function formatMoney(
  amount:number,
  locale:string = 'en-US',
  style:string = "currency",
  currency:string = "USD",
):string {
  return new Intl.NumberFormat(locale, {style, currency}).format(amount);
}

