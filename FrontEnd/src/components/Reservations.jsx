import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ContextGlobal } from "../utilities/globalContext";

function Reservations({ product }) {
  const [value, setValue] = useState(new Date());

  function startBooking() {
    setValue([new Date(Date.now()), new Date(Date.now())]);
  }

  function onChange(nextValue) {
    setValue(nextValue);
  }

  useEffect(() => {
    startBooking();
  }, []);

  const { id } = useParams();

  const { isLogged, handlePath, path } = useContext(ContextGlobal);
  const navigation = useNavigate();

  return (
    <div className="booking">
      <h4>Available dates</h4>
      <div className="reserve">
        <div className="calendar">
          <Calendar
            className={"calendar-form"}
            onChange={onChange}
            value={value}
            calendarType={"US"}
            showDoubleView={true}
            selectRange={true}
            minDate={new Date(Date.now())}
            goToRangeStartOnSelect={false}
          ></Calendar>
        </div>
        <div className="calendar-mobile">
          <Calendar
            className={"calendar-form"}
            onChange={onChange}
            value={value}
            calendarType={"US"}
            selectRange={true}
            minDate={new Date(Date.now())}
            goToRangeStartOnSelect={false}
          ></Calendar>
        </div>
        <div className="buttonReserve">
          <p>Take the vehicle of your choice</p>
          <button
            onClick={() => {
              {
                handlePath();
                isLogged
                  ? navigation(`/product/reservation/${id}`)
                  : navigation("/login");
              }
            }}
          >
            Start!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reservations;
