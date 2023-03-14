import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContextGlobal } from "../utilities/globalContext";
import { Card } from "../components/Card";
import ReservDetail from "../components/ReservDetail";
import ReservUser from "../components/ReservUser";
import { HeaderBlock, HeaderBlockWithoutCity } from "../components/HeaderBlock";
import { Searcher } from "../components/Searcher";
function BookingUser () {
    const [bookingsUser, setBookingsUser] = useState();
    const {token} = useContext(ContextGlobal);
    const {userId} = useParams();

    const authorization = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token.token,
        },
      };

      const urlReservas = `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/booking/user/${userId}`

      async function getData (url, body) {
        const data = await fetch(url, body);
        const bookings = await data.json();
        setBookingsUser(bookings)
      }

      useEffect(() => {
        getData(urlReservas, authorization);
      }, [])
    
    console.log(token)
    // console.log(bookingsUser)
    return (
        <>
        <div className="aux-top">
          <HeaderBlockWithoutCity />
        </div>
        {bookingsUser && bookingsUser.length > 0 ? 
        <div>
        <h1 className="booking-user">My Bookings</h1>
        <div className="cardBookings">
        {/* <ReservDetail></ReservDetail> */}
        {bookingsUser && bookingsUser.map(booking => (
          <ReservUser reserv={booking}></ReservUser>
        ))}
        </div>
        </div>
        : bookingsUser && bookingsUser.length === 0 ?
        <div className="not-booking">
          <div>
          No active bookings yet
          <img src="https://cdn-icons-png.flaticon.com/512/1076/1076745.png" alt="logo-notBookng" />
          </div>
          
        </div>
        : null
        }
        </>
    )
}

export default BookingUser;