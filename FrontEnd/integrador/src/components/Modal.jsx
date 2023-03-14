import React from "react";
import { Link } from "react-router-dom";

export function ModalGoodResponse({ open }) {
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="overlay__background">
        <img
          src="https://g2-images-destiautos.s3.us-east-2.amazonaws.com/icons/TrueBooking.png"
          alt="Img Response"
          className="overlay__img"
        />
        <div>
          <div>
            <h1>Thanks</h1>
            <h2>Your reservation has been successful</h2>
          </div>
          <div className="overlay__button">
            <Link to="/home">
              <button className="button2">Ok</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalBadResponse({
  openModalBad,
  setOpenModalBad,
  setShowError,
}) {
  function close() {
    if (openModalBad === true) {
      setOpenModalBad(false);
      setShowError(false);
    }
  }

  if (!openModalBad) return null;

  return (
    <div className="overlay">
      <div className="overlay__background">
        <img
          src="https://g2-images-destiautos.s3.us-east-2.amazonaws.com/icons/FalseBooking.png"
          alt="Img Response"
          className="overlay__img"
        />
        <div>
          <div>
            <h1>Sorry</h1>
            <h2>Your reservation was not successful</h2>
            <h2>Selected Dates are Booked</h2>
          </div>
          <div className="overlay__button">
            <button onClick={() => close()} className="button2">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalGoodResponseProduct({ open }) {
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="overlay__background">
        <img
          src="https://g2-images-destiautos.s3.us-east-2.amazonaws.com/icons/carAdd.png"
          alt="Img Response"
          className="overlay__img"
        />
        <div>
          <div>
            <h1>Thanks</h1>
            <h2>Vehicle successfully added 👌🏽😉🚘</h2>
          </div>
          <div className="overlay__button">
            <Link to="/home">
              <button className="button2">Ok</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
