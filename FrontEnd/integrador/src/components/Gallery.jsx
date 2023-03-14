import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

function Gallery(props) {
  const { imgProducts } = props;
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {imgProducts?.map((product) => (
        <SwiperSlide key={product.carLicensePlate}>
          <img src={product.url} alt="image product" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Gallery;
