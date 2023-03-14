import {React, useContext, useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { useParams } from "react-router-dom";
import { ContextGlobal, GlobalContext } from "../utilities/globalContext";


function CalendarBooking({errorDate,showError}) {
    const [value, setValue] = useState(new Date());
    const {dates, setDates, token} = useContext(ContextGlobal);
    const [bookings, setBookings] = useState();
    const {id} = useParams();
    const urlBoooking = `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/booking/product/${id}`

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

    function startBooking() {
        setValue([new Date(Date.now()),new Date(Date.now())])
    }

    function onChangeDate(target) {
        setDates(target);
    }

    function datesBooking(date) {
        if (bookings) {
         
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

    useEffect(() => {
        startBooking()
        getData(urlBoooking, authorization)
    }, [])

    return ( 
    <div className="calendar-booking">
        <h1 className="title">Select your reservation date</h1>
        <Calendar
            className={"calendar-form"}
            onChange={onChangeDate}
            value={dates}
            calendarType={"US"}
            showDoubleView={true}
            selectRange={true}
            minDate={new Date(Date.now())}
            goToRangeStartOnSelect={false}
            tileDisabled={datesBooking}
        >
        </Calendar>
        <h2 className="errorMessage">{showError?errorDate?"The Date field must be selected with a date other than today":null:null}</h2>
    </div>
    
    )
}

export default CalendarBooking;