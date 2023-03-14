import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DescriptionBlock } from "../components/DescriptionBlock";
import FeaturesIcon from "../components/FeaturesIcon";
import { HeaderBlock } from "../components/HeaderBlock";
import ImagesProduct from "../components/ImagesProduct";
import { LocationData } from "../components/LocationData";
import MapBlock from "../components/MapBlock";
import Politicas from "../components/Politicas";
import Reservations from "../components/Reservations";

function DetailProduct() {
  const [product, setProduct] = useState();
  const { id } = useParams();
  async function getData() {
    const data = await fetch(
      `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/product/${id}`
    );
    const products = await data.json();
    setProduct(products);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="detailBlock">
      <div className="grid-area--2-rows row--1-of-3 aux-top">
        <HeaderBlock className="row--1-of-2" product={product} />
        <LocationData className="row--2-of-2" product={product} />
      </div>
      <ImagesProduct product={product} />
      <DescriptionBlock product={product} />
      <FeaturesIcon product={product} />
      <MapBlock />
      <Reservations product={product} />
      <Politicas></Politicas>
    </div>
  );
}

export default DetailProduct;
