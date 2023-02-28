import React from "react";
import symbol from "../car.png";

function Modal({ open }) {
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="overlay__background">
        <img src="https://g2-images-destiautos.s3.us-east-2.amazonaws.com/icons/TrueBooking.png" alt="Img Response" className="overlay__img" />
        <div>
            <div>
            <h1>Thanks</h1>
            <h3>your reservation has been booked</h3>
            </div>
            <div>
                <button className="button2">Ok</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
