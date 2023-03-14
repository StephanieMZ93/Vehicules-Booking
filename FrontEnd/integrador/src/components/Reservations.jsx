import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ReservDetailContext } from "../Routes/Reserv";
import { ContextGlobal, GlobalContext } from "../utilities/globalContext";

function Reservations() {


  const [value, setValue] = useState(new Date());
  const {dates, setDates, token} = useContext(ContextGlobal);
  const [bookings, setBookings] = useState();
  const { id } = useParams();
  const urlBoooking = `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/booking/product/${id}`

  // console.log(bookings ,"booking")
  function startBooking() {
    setDates([new Date(Date.now()), new Date(Date.now())]);
  }

  function onChange(nextValue) {
    setDates(nextValue)
  }
  
  const authorization = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token.token,
    },
  };
  
  async function getData(url, body) {
    const data = await fetch(url, body)
    const dataBoooking = await data.json()
    setBookings(dataBoooking)
  }

  useEffect(() => {
    startBooking();
    getData(urlBoooking, authorization)
  }, []);
  
  function datesBooking(date) {
    if (bookings) {
      // console.log(date.date)
      return date && bookings.some(range => {
        const st = new Date(range.startDate);
        const en = new Date(range.endDate);
        return (
          date.date.getFullYear() >= st.getFullYear() && 
          date.date.getMonth() >= st.getMonth() &&
          date.date.getDate() >= st.getDate() &&
          date.date.getFullYear() <= en.getFullYear() &&
          date.date.getMonth() <= en.getMonth() &&
          date.date.getDate() <= en.getDate()
        )
      }
        )
    } else {
      return false
    }
    
  }

  const { isLogged, handlePath, path } = useContext(ContextGlobal);
  const navigation = useNavigate();

  return (
    <div className="booking">
      <h4>Available dates</h4>
      <div className="reserve">
        {bookings && 
        <div className="calendar">
        <Calendar
          className={"calendar-form"}
          onChange={onChange}
          value={dates}
          calendarType={"US"}
          showDoubleView={true}
          selectRange={true}
          minDate={new Date(Date.now())}
          goToRangeStartOnSelect={false}
          tileDisabled={datesBooking}
        ></Calendar>
      </div>
        }
        {bookings &&
        <div className="calendar-mobile">
        <Calendar
          className={"calendar-form"}
          onChange={onChange}
          value={dates}
          calendarType={"US"}
          selectRange={true}
          minDate={new Date(Date.now())}
          goToRangeStartOnSelect={false}
          tileDisabled={datesBooking}
        ></Calendar>
      </div>
        }
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
