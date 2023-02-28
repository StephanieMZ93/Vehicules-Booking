import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { getRandomProducts } from "../utilities/gets/getRandomProducts";
import { shuffle } from "../utilities/shuffle";
function Products() {
  const [randomProducts, setRandomProducts] = useState(undefined);

  const getProductsRand = async () => {
    const data = await fetch(
      "http://ec2-3-144-24-77.us-east-2.compute.amazonaws.com:8080/product"
    );
    const products = await data.json();
    setRandomProducts(shuffle(products));
  };

  useEffect(() => {
    getProductsRand();
  }, []);

  // console.log("PRODUCTS:", randomProducts);
  return (
    // <main>
    <div className="list">
      <h2>Recomendations</h2>
      <div className="list-card">
        {randomProducts
          ? randomProducts.map((product) => (
              <Card key={product.id} product={product}></Card>
            ))
          : false}
      </div>
    </div>
    // /* </main> */
  );
}

export default Products;
