import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { ContextGlobal } from "../utilities/globalContext";

import { Rating } from "./Rating";

function ReservDetail({
  product,
  reservDetail,
  errorTime,
  setErrorTime,
  errorCity,
  setErrorCity,
  errorDate,
  setErrorDate,
  openModalGood,
  setOpenModalGood,
  openModalBad,
  setOpenModalBad,
  setShowError,
}) {
  const { token, dates } = useContext(ContextGlobal);
  const [error, setError] = useState(false);

  const data = {
    startHour: reservDetail?.pickUpTime,
    startDate: dates[0].toLocaleDateString("fr-CA"),
    endDate: dates[1].toLocaleDateString("fr-CA"),
    products_id: product?.id,
    user_id: token?.userInfo?.id,
  };

  const dataUser = {
    id: token?.userInfo?.id,
    name: token?.userInfo?.name,
    lastName: token?.userInfo?.lastName,
    email: token?.userInfo?.email,
    password: token?.userInfo?.password,
    city: reservDetail?.newCity,
  };

  async function bookingValidation() {
    if (errorCity === false && errorDate === false && errorTime === false) {
      const url =
        "http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/booking";
      const bookingInfo = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token.token,
        },
        body: JSON.stringify(data),
      };

      const bookingRegister = await fetch(url, bookingInfo);
      const dataBooking = await bookingRegister.status;
      const mirandonadamas = await bookingRegister.json();

      if (dataBooking === 200) {
        const urlUpdateUser =
          "http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/user/Update/email";
        const userInfo = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token.token,
          },
          body: JSON.stringify(dataUser),
        };

        const userUpdate = await fetch(urlUpdateUser, userInfo);

        setOpenModalGood(true);
        setError(false);
      }

      if (dataBooking === 400) {
        setOpenModalBad(true);
        setError(false);
      }
    } else {
      setError(true);
    }
  }

  function validateRequest() {
    const comparation = new Date(Date.now());
    if (reservDetail.newCity === "" || reservDetail.newCity === null) {
      setErrorCity(true);
    } else {
      setErrorCity(false);
    }

    if (reservDetail.pickUpTime === "") {
      setErrorTime(true);
    } else {
      setErrorTime(false);
    }

    if (
      dates[0].toLocaleDateString("fr-CA") ===
        comparation.toLocaleDateString("fr-CA") ||
      dates[1].toLocaleDateString("fr-CA") ===
        comparation.toLocaleDateString("fr-CA")
    ) {
      setErrorDate(true);
    } else {
      setErrorDate(false);
    }
  }

  useEffect(() => {
    validateRequest();
  }, [dates]);

  useEffect(() => {
    validateRequest();
  }, [reservDetail]);

  function onSubmit() {
    setShowError(true);
    bookingValidation();
  }

  const urlImage = product?.image?.filter((productos) =>
    productos.title?.includes("Reservation")
  )[0]?.url;

  return (
    <div className="cardDetail">
      <h1>Reservation Detail</h1>
      <img src={urlImage} alt="imagen reservpage" />
      <Rating avgRating={product?.productAverage} productID={product?.id} />
      <div className="cardDetail__info">
        <p>
          <span>Category:</span> {product?.category?.title}
        </p>
      </div>

      <div className="cardDetail__info">
        <p>
          <span>Brand:</span> {product?.productName}
        </p>
      </div>
      <div className="cardDetail__info">
        <p>
          <span>Model:</span> {product?.model}
        </p>
      </div>
      <div className="cardDetail__info">
        <p>
          <span>Product City:</span> {product?.city?.nameCity}
        </p>
      </div>
      <div className="cardDetail__info">
        <span>Price Per Day: </span>
        {product?.priceDay} USD
      </div>
      <div className="cardDetail__check">
        <h4>Check In: {dates[0].toLocaleDateString("fr-CA")}</h4>
      </div>
      <div className="cardDetail__check">
        <h4>Check Out: {dates[1].toLocaleDateString("fr-CA")}</h4>
      </div>
      <div className="cardDetail__check">
        <h4>Pick Up Time: {reservDetail?.pickUpTime}</h4>
      </div>
      {/* <a type="button" href="/product/reservation/:id/confirm" className="button2">Confirm</a> */}
      <button onClick={() => onSubmit()} className="button--5">
        Confirm
      </button>
      <h3 className="errorMessage">{error ? "Some field is empty" : null}</h3>
    </div>
  );
}

export default ReservDetail;
