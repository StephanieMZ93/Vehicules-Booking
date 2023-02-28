import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faStar } from "@fortawesome/free-solid-svg-icons";

import { ContextGlobal } from "../utilities/globalContext";

export const Rating = () => {
  const { token } = useContext(ContextGlobal);
  const [currentRate, setCurrentRate] = useState(0);

  const [hoverRate, sethoverRate] = useState(undefined);

  const handleClick = (value) => {
    setCurrentRate(value); // Meantime
    //  if (token) {
    //    setCurrentRate(value);
    //       const bodyRating= {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       authorization: "Bearer " + jwt,
    //     },
    //     body: JSON.stringify(value),
    //   };

    //   const postRating= await fetch(url,bodyRating);
    //   const newRating= await postRating.json();
    //  } else {
    //    setCurrentRate(Math.round(propQueVengaComoPropDeCard));
    //  }
  };
  //   console.log("RATE:", currentRate);
  const handleMouseOver = (value) => {
    sethoverRate(value);
  };

  const handleMouseLeave = () => {
    sethoverRate(undefined);
  };

  const colors = {
    yellow: "#FFBA5A",
    grey: "#ebebeb",
    //  grey: "#a9a9a9",
  };

  const starts = Array(5).fill(0);
  return (
    <div>
      <div className="rating">{/* <div>Excellent</div> */}</div>

      <div className="rating-container">
        {starts.map((_, index) => (
          <FontAwesomeIcon
            className="rating-stars"
            icon={faStar}
            key={"Star" + index}
            onClick={() => handleClick(index + 1)}
            color={
              (hoverRate || currentRate) > index ? colors.yellow : colors.grey
            }
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
        <div>
          <p>5.0</p>
        </div>
      </div>
    </div>
  );
};
