export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export function getPrevMonthDates(curMonth: number, curYear: number): number[] {
  const dates = [];
  const currentMonthStart = new Date(curYear, curMonth, 1);
  const prevMonthEnd = new Date(curYear, curMonth, 0);
  const currMonthStartIndex = currentMonthStart.getDay();
  const prevMonthEndDate = prevMonthEnd.getDate();

  for (
    let i = 1 + prevMonthEndDate - currMonthStartIndex;
    i <= prevMonthEndDate;
    i++
  ) {
    dates.push(i);
  }

  return dates;
}

export function getDates(curMonth: number, curYear: number): number[] {
  const dates = [];
  const endDate = new Date(curYear, curMonth + 1, 0).getDate();

  for (let i = 1; i <= endDate; i++) {
    dates.push(i);
  }

  return dates;
}

export function getNextMonthDates(curMonth: number, curYear: number): number[] {
  const dates = [];
  const currentMonthEnd = new Date(curYear, curMonth + 1, 0);
  const currentMonthEndIndex = currentMonthEnd.getDay();

  for (let i = 1; i <= 6 - currentMonthEndIndex; i++) {
    dates.push(i);
  }

  return dates;
}
