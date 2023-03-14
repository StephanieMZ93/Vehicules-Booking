import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export const HeaderBlock = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="headerBlock">
      <div className="headerBlock__left">
        {product ? (
          <>
            <h1>{product?.category?.title}</h1>
            <p>{product?.productName}</p>
          </>
        ) : (
          <div className="locationData__city">
            <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>&nbsp;
            {"Pending location..."}
          </div>
        )}
      </div>
      <div className="headerBlock__right">
        <Link onClick={() => navigate(-1)}>
          &#60;<span className="headerBlock__right-arrow">-</span>
        </Link>
      </div>
    </div>
  );
};


export const HeaderBlockWithoutCity = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="headerBlock">
      <div className="headerBlock__left">
        {product ? (
          <>
            <h1>{product?.category?.title}</h1>
            <p>{product?.productName}</p>
          </>
        ) : (
          null
        )}
      </div>
      <div className="headerBlock__right">
        <Link onClick={() => navigate(-1)}>
          &#60;<span className="headerBlock__right-arrow">-</span>
        </Link>
      </div>
    </div>
  );
};
