import React, { useEffect, useMemo, useState } from "react";
import { Card } from "./Card";
import { shuffle } from "../utilities/shuffle";
function Products() {
  const [randomProducts, setRandomProducts] = useState(undefined);

  const getProductsRand = async () => {
    const data = await fetch(
      "http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/product"
    );
    const products = await data.json();
    setRandomProducts(shuffle(products));
  };
  useMemo(() => getProductsRand(), []);

  useEffect(() => {
    getProductsRand();
  }, []);

  // console.log("PRODUCTS:", randomProducts);
  return (
    <div className="list">
      <h2>Recomendations</h2>
      <div className="list-card">
        {randomProducts
          ? randomProducts.map((product) => (
              <Card
                key={product.productName + product.brand}
                product={product}
              />
            ))
          : false}
      </div>
    </div>
  );
}

export default Products;
