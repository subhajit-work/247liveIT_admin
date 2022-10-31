import * as moment from "moment";

export let couponTypes = [
  {id: 1, text : 'Amount'},
  {id: 2, text: 'Percentage'}
]

export function ConvertDateFormat(timestamp, pattern) {
  let date = moment(timestamp).format(pattern);
  return date;
}