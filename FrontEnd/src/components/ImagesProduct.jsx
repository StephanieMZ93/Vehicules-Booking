import React, { useEffect } from "react";
import { useState } from "react";
import imagenes from "../data/imagesDetails.json";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import CarouselImg from "./CarouselImg";
import Gallery from "./Gallery";
import { useParams, Link } from "react-router-dom";

function ImagesProduct({ product }) {
  const [visibleModal, setVisibleModal] = useState(false);
  // const [product, setProduct] = useState()

  // const { id } = useParams();

  // async function getImg() {
  // const data = await fetch(`http://localhost:8080/product/${id}`)
  // const imgs = await data.json()
  // setProduct(imgs)
  // }

  // useEffect(() => {
  // getImg()
  // },[])

  function handleModal() {
    setVisibleModal(!visibleModal);
  }

  return (
    <>
      <div className="gallery-products">
        <div className="gallery-products-main">
          <img
            src={
              product &&
              product.image.filter((img) => img.title.includes("Main"))[0]?.url
            }
            alt="car"
          />
        </div>
        <div className="gallery-products-mains">
          {/* {product &&  imagenes.map((image) => ( */}
          {/* <div key={image.url}> */}
          {/* <img src={image.url} alt="imagen" /> */}
          {/* </div> */}
          {/* ))} */}
          {product &&
            product.image
              .filter((img) => !img.title.includes("Main"))
              .slice(0, 4)
              .map(({ url }) => (
                <img key={product.image.title} src={url} alt="imagen" />
              ))}
          <div className="gallery-products-imgs">
            <button className="button--5" onClick={handleModal}>
              View more...
            </button>
          </div>
        </div>
      </div>
      <div className={visibleModal ? "modal" : "view-modal"}>
        <div className="buttonModal">
          <button onClick={handleModal}>X</button>
          <CarouselImg imgs={product?.image} />
        </div>
      </div>
      <div className="gallery-imgs">
        <Gallery imgProducts={product?.image}></Gallery>
      </div>
    </>
  );
}

export default ImagesProduct;
