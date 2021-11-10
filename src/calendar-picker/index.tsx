import { useState } from "react";
import "./calendar.scss";

import {
  DAYS,
  MONTHS,
  getPrevMonthDates,
  getDates,
  getNextMonthDates
} from "./utils";

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  disabledFutureDates?: boolean;
}

export default function Calendar(props: CalendarProps) {
  const { selectedDate, onDateSelect, disabledFutureDates = false } = props;

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const selectDate = (date: number) => () => {
    if (onDateSelect) {
      onDateSelect(new Date(currentYear, currentMonth, date));
    }
  };

  const changeMonth = (change: number) => () => {
    const updatedDate = new Date(currentYear, currentMonth + change, 1);
    setCurrentMonth(updatedDate.getMonth());
    setCurrentYear(updatedDate.getFullYear());
  };

  const isToday = (date: number) =>
    date === today.getDate() &&
    today.getMonth() === currentMonth &&
    today.getFullYear() === currentYear;

  const isSelectedDate = (date: number) =>
    selectedDate?.getDate() === date &&
    selectedDate?.getMonth() === currentMonth &&
    selectedDate?.getFullYear() === currentYear;

  const isFutureDate = (date: number) =>
    (date > today.getDate() && currentMonth === today.getMonth()) ||
    (currentMonth > today.getMonth() && currentYear === today.getFullYear()) ||
    currentYear > today.getFullYear();

  return (
    <div className="calendar">
      <div className="calendar__header">
        <div className="calendar__header-month_switcher">
          <div className="arrow__previous-month" onClick={changeMonth(-1)}>
            &#8592;
          </div>
          <h3>
            {MONTHS[currentMonth]} {currentYear}
          </h3>
          <div className="arrow__next-month" onClick={changeMonth(1)}>
            &#8594;
          </div>
        </div>
        <div className="calendar__header-weeks">
          {DAYS.map((day) => (
            <div className="calendar__header-week-day" key={`week-${day}`}>
              {day.substr(0, 3)}
            </div>
          ))}
        </div>
      </div>
      <div className="calendar__body">
        {getPrevMonthDates(currentMonth, currentYear).map((date) => (
          <div className="calendar__body-day prev-month" key={`prev-${date}`}>
            {date}
          </div>
        ))}
        {getDates(currentMonth, currentYear).map((date) => (
          <div
            className={`calendar__body-day
                ${isSelectedDate(date) ? "selected" : ""}
                ${disabledFutureDates && isFutureDate(date) ? "disabled" : ""}
                ${isToday(date) ? "today" : ""}
            `}
            key={`curr-${date}`}
            onClick={selectDate(date)}
          >
            {date.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false
            })}
          </div>
        ))}
        {getNextMonthDates(currentMonth, currentYear).map((date) => (
          <div className="calendar__body-day prev-month" key={`prev-${date}`}>
            {date}
          </div>
        ))}
      </div>
    </div>
  );
}
