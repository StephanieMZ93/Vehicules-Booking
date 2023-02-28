import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Rating } from "./Rating";

export const LocationData = ({ product }) => {
  return (
    <div className="locationData">
      <div className="locationData__city">
        <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>&nbsp;
        {product?.city?.nameCity}
      </div>
      <Rating />
    </div>
  );
};
//   return (
//     <div className="locationData">
//       <div className="locationData__city">
//         <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>&nbsp;
//         {product?.city?.nameCity}
//       </div>
//       <div className="locationData__rating">
//         <div>Excellent</div>
//         <div className="locationData__rating-container">
//           {starts.map((_, index) => (
//             <FontAwesomeIcon
//               className="locationData__rating-stars"
//               icon={faStar}
//               key={index}
//               onClick={() => handleClick(index + 1)}
//               color={
//                 (hoverRate || currentRate) > index ? colors.yellow : colors.grey
//               }
//               onMouseOver={() => handleMouseOver(index + 1)}
//               onMouseLeave={handleMouseLeave}
//             />
//           ))}
//           <div>
//             <p>5.0</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
