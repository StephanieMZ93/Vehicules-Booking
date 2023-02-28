import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      "http://ec2-3-144-24-77.us-east-2.compute.amazonaws.com:8080/product"
    );
    const totalProducts = await getTotalProducts.json();

    setTotalProdXCategory(totalProducts);
  };

  useEffect(() => {
    getCategories2();
  }, []);

  const navigation = useNavigate();

  return (
    <div className="categories-section">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        showsPagination={true}
        loop={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="categories-container"
      >
        {request &&
          request.map((category) => {
            return (
              <>
                <SwiperSlide
                  className="category__slider"
                  onClick={() => navigation(`/category/product/${category.id}`)}
                >
                  <div
                    className="category__img"
                    style={{ "background-image": `url(${category.urlImage})` }}
                  ></div>
                  <div
                    className="category__info"
                    onClick={() =>
                      navigation(`/category/product/${category.id}`)
                    }
                  >
                    <h2>{category.title}</h2>
                    <p>
                      <b> Total vehicles:</b>{" "}
                      {
                        totalProdXCategory?.filter(
                          (product) => category?.id === product.category.id
                        ).length
                      }
                    </p>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
      </Swiper>
    </div>
  );
};
