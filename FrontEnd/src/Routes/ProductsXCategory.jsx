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
            // <div key={product.productName} className="card">
            //   <div
            //     className="card-img"
            //     style={{
            //       backgroundImage: `url(${
            //         product.image.filter((productos) =>
            //           productos.title.includes("Main")
            //         )[0]?.url
            //       })`,
            //     }}
            //   >
            //     {" "}
            //   </div>
            //   <div className="card-information">
            //     <h4>{product.category.title}</h4>
            //     <p>{product.productName}</p>
            //     <p>{product.city.nameCity}</p>
            //     <p>{product.description}</p>
            //     <Link to={`/product/detail/${product.id}`} onClick={handlerHide}>
            //       <button className="button--4">Details</button>
            //     </Link>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </>
  );
};
