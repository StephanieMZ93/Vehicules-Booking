import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
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
