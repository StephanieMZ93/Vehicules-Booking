import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import Modal from "./Modal";

function ReservDetail({ product }) {
  const [openModal, setOpenModal] = useState(false);

  const url = product?.image?.filter((productos) =>
    productos.title?.includes("Reservation")
  )[0]?.url;

  return (
    <div className="cardDetail">
      <h1>Reservation Detail</h1>
      <img src={url} alt="" />
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
        <h4>Check In:</h4>
      </div>
      <div className="cardDetail__check">
        <h4>Check Out:</h4>
      </div>
      <div className="cardDetail__check">
        <h4>Pick Up Time:</h4>
      </div>
      {/* <a type="button" href="/product/reservation/:id/confirm" className="button2">Confirm</a> */}
      <button onClick={() => setOpenModal(true)} className="button2">
      Confirm reservation
      </button>
      <Modal open={openModal} />
    </div>
  );
}

export default ReservDetail;