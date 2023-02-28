import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const HeaderBlock = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="headerBlock">
      <div className="headerBlock__left">
        <h1>{product?.category?.title}</h1>
        <p>{product?.productName}</p>
      </div>
      <div className="headerBlock__right">
        <Link onClick={() => navigate(-1)}>
          &#60;<span className="headerBlock__right-arrow">-</span>
        </Link>
      </div>
    </div>
  );
};
