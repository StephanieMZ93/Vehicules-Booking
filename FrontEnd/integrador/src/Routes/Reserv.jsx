import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Arrive from "../components/Arrive";
import CalendarBooking from "../components/CalendarBooking";
import { HeaderBlock } from "../components/HeaderBlock";
import { ModalGoodResponse, ModalBadResponse } from "../components/Modal";
import Politicas from "../components/Politicas";
import ReservDetail from "../components/ReservDetail";
import ReservForm from "../components/ReservForm";
import { ContextGlobal } from "../utilities/globalContext";

function Reserv() {
  const { token } = useContext(ContextGlobal);
  const [reservDetails, setReservDetails] = useState({
    userId: token.userInfo.id,
    pickUpTime: "",
    newCity: token?.userInfo?.city,
  });

  const [errorTime, setErrorTime] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const [openModalGood, setOpenModalGood] = useState(false);
  const [openModalBad, setOpenModalBad] = useState(false);
  const [showError, setShowError] = useState(false);

  const [product, setProduct] = useState({});
  const { id } = useParams();

  const getData = async () => {
    const data = await fetch(
      `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/product/${id}`
    );
    const products = await data.json();
    setProduct(products);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ModalGoodResponse open={openModalGood} />
      <ModalBadResponse openModalBad={openModalBad} setOpenModalBad ={setOpenModalBad} setShowError={setShowError}/>
      <div className="aux-top">
        <HeaderBlock product={product}/>
      </div>
      <div className="reserv">
        <ReservForm
          reservDetail={reservDetails}
          setReservDetails={setReservDetails}
          errorCity={errorCity}
          showError={showError}
        />
        <ReservDetail
          product={product}
          reservDetail={reservDetails}
          setReservDetails={setReservDetails}
          errorTime={errorTime}
          setErrorTime={setErrorTime}
          errorCity={errorCity}
          setErrorCity={setErrorCity}
          errorDate={errorDate}
          setErrorDate={setErrorDate}
          openModalGood={openModalGood}
          setOpenModalGood={setOpenModalGood}
          openModalBad={openModalBad}
          setOpenModalBad={setOpenModalBad}
          setShowError={setShowError}
        />
        <CalendarBooking errorDate={errorDate} showError={showError} />
        <Arrive
          reservDetail={reservDetails}
          setReservDetails={setReservDetails}
          errorTime={errorTime}
          showError={showError}
        />
        <Politicas />
      </div>
    </>
  );
}
export default Reserv;
