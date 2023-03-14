// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import "swiper/css/effect-fade";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

export default function CarouselImg(props) {
  const { imgs } = props;
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        showsPagination={true}
        loop={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {/* <SwiperSlide><div className="imgs">Slide 1</div></SwiperSlide> */}
        {
          /* {imgs?.map((img) => (
          <SwiperSlide key={img.url}>
            <img src={img.url} alt="" />
          </SwiperSlide>
        ))} */

          imgs
            ?.filter((img) => !img.title.includes("Main"))
            .filter((nImg) => !nImg.title.includes("_Reservation"))
            .map(({ url }) => (
              <SwiperSlide key={url}>
                <img src={url} alt="" />
              </SwiperSlide>
            ))
        }
      </Swiper>
    </>
  );
}

/* 
    imgs
            ?.filter((img) => !img.title.includes("Main"))
            .filter((nImg) => !nImg.title.includes("_Reservation"))
            .map(({ url }) => (
              <SwiperSlide key={url}>
                <img src={url} alt="" />
              </SwiperSlide>
            ))
*/
