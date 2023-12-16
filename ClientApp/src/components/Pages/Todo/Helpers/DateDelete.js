import moment from "moment";

export function disabledDate(current) {
  return current && current < moment().endOf("day");
}
