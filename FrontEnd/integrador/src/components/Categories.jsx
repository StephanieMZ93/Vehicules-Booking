import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../utilities/gets/getCategories";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import "swiper/css/effect-fade";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

export const Categories = () => {
  const [request, setRequest] = useState([]);
  const [totalProdXCategory, setTotalProdXCategory] = useState();
  const getCategories2 = async () => {
    const newImages = await getCategories();
    setRequest(newImages);
    //PRODUCTS
    const getTotalProducts = await fetch(
      "http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/product"
    );
    const totalProducts = await getTotalProducts.json();

    setTotalProdXCategory(totalProducts);
  };

  useEffect(() => {
    getCategories2();
  }, []);

  const navigation = useNavigate();

  return (
    <div className="categories-section" key={"swiper-home-page"}>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        // showsPagination={true}
        loop={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="categories-container"
        key={"swiper-home-page"}
      >
        {request &&
          request.map((category) => {
            return (
              <>
                <SwiperSlide
                  className="category__slider"
                  onClick={() => navigation(`/category/product/${category.id}`)}
                  key={category.urlImage + "swiper-home-page"}
                >
                  <div
                    className="category__img"
                    key={category.id + category.urlImage}
                    style={{ backgroundImage: `url(${category.urlImage})` }}
                  ></div>
                  <div
                    className="category__info"
                    key={category.title + category.urlImage}
                    onClick={() =>
                      navigation(`/category/product/${category.id}`)
                    }
                  >
                    <h2 className="categories__title">{category.title}</h2>
                    <h3>
                      <b> Total vehicles:</b>{" "}
                      {
                        totalProdXCategory?.filter(
                          (product) => category?.id === product.category.id
                        ).length
                      }
                    </h3>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
      </Swiper>
    </div>
  );
};
