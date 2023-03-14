import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faStar } from "@fortawesome/free-solid-svg-icons";

import { ContextGlobal } from "../utilities/globalContext";

export const Rating = ({ productID, avgRating }) => {
  const { token } = useContext(ContextGlobal);
  const [currentRate, setCurrentRate] = useState(avgRating?.toFixed(1));
  const [avgRate, setAvgRate] = useState(avgRating?.toFixed(1));
  const [hoverRate, sethoverRate] = useState(undefined);

  //--------------Consulting Rating average-------------------------
  const getAvgRating = async () => {
    const url = `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/product/${productID}`;
    const newAvgRating = await fetch(url);
    const data = await newAvgRating.json();
    // console.log("AVGRATING:", data);
    setAvgRate(data?.productAverage.toFixed(1));
    // setCurrentRate(Math.round(newAvgRating));
  };

  //--------------SETTING RATING------------------------------------
  const handleRatingRequest = async (value) => {
    // console.log("PRODUCTID", productID);
    // console.log("VALUE:", value);
    // console.log("token?.userInfo?.id,:", token?.userInfo?.id);
    // console.log("USERINFO:", token?.userInfo);

    const url =
      "http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/rating";
    const bodyInfo = {
      products_id: productID,
      users_id: token?.userInfo?.id,
      rating: value,
    };
    //--------------Validating client and rating--------------------
    if (token?.token) {
      // console.log("TOKENRATING", token.token);
      // setCurrentRate(value);
      const ratingObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token?.token,
        },
        body: JSON.stringify(bodyInfo),
      };
      // console.log(ratingObject);
      const postRating = await fetch(url, ratingObject);
      const newRating = await postRating.json();
      if (newRating) {
        // console.log("INSIDE NEW RATING", newRating.rating);
        setCurrentRate(newRating?.rating);
        getAvgRating();
      }
    } else {
      // setCurrentRate(Math.round(currentRate));
      return;
    }
  };

  const handleClick = (value) => {
    // console.log("PRODUCTID", productID);
    // console.log("VALUE", value);
    handleRatingRequest(value);
    // setCurrentRate(value);
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

  // useEffect(() => {
  //   getAvgRating();
  // }, [currentRate]);

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
          <p>{avgRate}</p>
        </div>
      </div>
    </div>
  );
};

// import React, { useContext, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { faStar } from "@fortawesome/free-solid-svg-icons";

// import { ContextGlobal } from "../utilities/globalContext";

// export const Rating = ({ avgRating }) => {
//   const { token } = useContext(ContextGlobal);
//   const [currentRate, setCurrentRate] = useState(avgRating);

//   const [hoverRate, sethoverRate] = useState(undefined);

//   const handleClick = async (value) => {
//     // setCurrentRate(value); // Meantime
//     const url = "";
//     if (token) {
//       setCurrentRate(value);
//       const bodyRating = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: "Bearer " + token.token,
//         },
//         body: JSON.stringify(value),
//       };

//       const postRating = await fetch(url, bodyRating);
//       const newRating = await postRating.json();
//     } else {
//       setCurrentRate(Math.round(avgRating));
//     }
//   };
//   //   console.log("RATE:", currentRate);
//   const handleMouseOver = (value) => {
//     sethoverRate(value);
//   };

//   const handleMouseLeave = () => {
//     sethoverRate(undefined);
//   };

//   const colors = {
//     yellow: "#FFBA5A",
//     grey: "#ebebeb",
//     //  grey: "#a9a9a9",
//   };

//   const starts = Array(5).fill(0);
//   return (
//     <div>
//       <div className="rating">{/* <div>Excellent</div> */}</div>

//       <div className="rating-container">
//         {starts.map((_, index) => (
//           <FontAwesomeIcon
//             className="rating-stars"
//             icon={faStar}
//             key={"Star" + index}
//             onClick={() => handleClick(index + 1)}
//             color={
//               (hoverRate || currentRate) > index ? colors.yellow : colors.grey
//             }
//             onMouseOver={() => handleMouseOver(index + 1)}
//             onMouseLeave={handleMouseLeave}
//           />
//         ))}
//         <div>
//           <p>{avgRating || 0}</p>
//         </div>
//       </div>
//     </div>
//   );
// };
