import { getProductsXCategory } from "../utilities/gets/getProductsXCategory";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { ContextGlobal } from "../utilities/globalContext";
import { Searcher } from "../components/Searcher";

export const ProductsXCategory = () => {
  const [prodXCategory, setProdXCategory] = useState([]);
  const { id } = useParams();

  const getProducts = async () => {
    const newCategory = await getProductsXCategory(id);
    setProdXCategory(newCategory);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Temporary
  const { handlerHide } = useContext(ContextGlobal);

  return (
    <>
      <Searcher key="searcher" />
      <div className="list">
        <div className="list-card">
          {prodXCategory.map((product) => (
            <Card key={product.productName} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};
