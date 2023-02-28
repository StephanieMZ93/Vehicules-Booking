import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Arrive from "../components/Arrive";
import CalendarBooking from "../components/CalendarBooking";
import { HeaderBlock } from "../components/HeaderBlock";
import Modal from "../components/Modal";
import Politicas from "../components/Politicas";
import ReservDetail from "../components/ReservDetail";
import ReservForm from "../components/ReservForm";

function Reserv() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const getData = async () => {
    const data = await fetch(
      `http://ec2-3-144-24-77.us-east-2.compute.amazonaws.com:8080/product/${id}`
    );
    const products = await data.json();
    console.log(product);
    setProduct(products);
  };
  useEffect(() => {
    getData();
  }, []);

  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="aux-top">
        <HeaderBlock />
      </div>
      <div className="reserv">
        <Modal />
        <ReservForm product={product} />
        <ReservDetail product={product} />
        <CalendarBooking />
        <Arrive />
        <Politicas />
      </div>
    </>
  );
}
export default Reserv;
