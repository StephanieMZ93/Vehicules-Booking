import React from "react";
import { Rating } from "./Rating";

function ReservUser({ reserv }) {
  console.log(reserv);
  const urlImg = reserv?.product?.image.filter((img) =>
    img.title.includes("Main")
  )[0].url;

  console.log(urlImg, "hello");
  return (
    <div className="cardDetails cardsReservUser">
      <h1>Reservation Detail</h1>
      <img src={urlImg} alt="imagen reservpage" />
      <Rating
        avgRating={reserv?.product?.productAverage}
        productID={reserv?.product?.id}
      />
      <div className="cardDetails__info">
        <p>
          <span>Category:</span> {reserv?.product?.category?.title}
        </p>
      </div>

      <div className="cardDetails__info">
        <p>
          <span>Brand:</span> {reserv?.product?.productName}
        </p>
      </div>
      <div className="cardDetails__info">
        <p>
          <span>Model:</span> {reserv?.product?.model}
        </p>
      </div>
      <div className="cardDetails__info">
        <p>
          <span>Product City:</span> {reserv?.product?.city?.nameCity}
        </p>
      </div>
      <div className="cardDetails__info">
        <span>Price Per Day: </span>
        {reserv?.product?.priceDay} USD
      </div>
      <div className="cardDetails__check">
        <h4>Check In: {reserv?.startDate}</h4>
      </div>
      <div className="cardDetails__check">
        <h4>Check Out: {reserv?.endDate}</h4>
      </div>
      <div className="cardDetails__check">
        <h4>Pick Up Time: {reserv?.startHour}</h4>
      </div>
    </div>
  );
}

export default ReservUser;
