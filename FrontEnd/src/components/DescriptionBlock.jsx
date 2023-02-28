import React from "react";

export const DescriptionBlock = ({ product }) => {
  return (
    <div className="descriptionBlock">
      <h1 className="descriptionBlock__title">Description</h1>
      <p className="descriptionBlock__info">{product?.description}</p>
    </div>
  );
};
