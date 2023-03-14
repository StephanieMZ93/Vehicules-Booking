import React, { useState } from "react";
import { Calendar } from "react-calendar";

function CalendarResev() {
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <div className="booking">
      <h1 className="colorL__version2">Select reservation date</h1>
      <div className="reserve__v2">
        <div className="calendar__v2">
          <Calendar
            className={"calendar-form"}
            onChange={onChange}
            value={value}
            calendarType={"US"}
            showDoubleView={true}
          />
        </div>
        <div className="calendar-mobile">
          <Calendar
            className={"calendar-form"}
            onChange={onChange}
            value={value}
            calendarType={"US"}
          />
        </div>
      </div>
    </div>
  );
}

export default CalendarResev;
