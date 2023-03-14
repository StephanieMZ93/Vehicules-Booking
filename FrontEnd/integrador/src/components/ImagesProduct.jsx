import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CarouselImg from "./CarouselImg";
import Gallery from "./Gallery";

function ImagesProduct({ product }) {
  const [visibleModal, setVisibleModal] = useState(false);

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
          {product &&
            product.image
              .filter(
                (img) =>
                  !img.title.includes("Main") &&
                  !img.title.includes("_Reservation")
              )
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

/* 
 <div className="gallery-products-mains">
          {product &&
            product.image
              .filter((img) => !img.title.includes("Main"))
              .slice(0, 4)
              .filter((nImg) => !nImg.title.includes("_Reservation"))
              .map(({ url }) => (
                <img key={product.image.title} src={url} alt="imagen" />
              ))}
          <div className="gallery-products-imgs">
*/
