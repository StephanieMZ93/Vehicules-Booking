import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";

function CalendarBooking() {
    const [value, setValue] = useState(new Date());

    function startBooking() {
        setValue([new Date(Date.now()),new Date(Date.now())])
    }

    function onChangeDate(nextValue) {
        setValue(nextValue);
    }

    useEffect(() => {
        startBooking()
    }, [])

    console.log(value)
    return ( 
    <div className="calendar-booking">
        <h1 className="title">Select your reservation date</h1>
        <Calendar
            className={"calendar-form"}
            onChange={onChangeDate}
            value={value}
            calendarType={"US"}
            showDoubleView={true}
            selectRange={true}
            minDate={new Date(Date.now())}
            goToRangeStartOnSelect={false}
        >
        </Calendar>
    </div>
    
    )
}

export default CalendarBooking;