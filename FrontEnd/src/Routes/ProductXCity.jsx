import { getProductXCity } from "../utilities/gets/getProductXCity";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { Searcher } from "../components/Searcher";
import { ContextGlobal } from "../utilities/globalContext";

export const ProductXCity = () => {
  const [prodXCity, setProdXCity] = useState([]);
  const { datestart, dateend, id } = useParams();
  // const {id} = useParams();
  // const {datestarted, dateended, idCity} = useParams();
  const {filter} = useContext(ContextGlobal)

  const getProductsDates = async ( datestart, dateend) => {
    const data = await fetch(`http://ec2-3-144-24-77.us-east-2.compute.amazonaws.com:8080/product/byDate?startDate=${datestart}&endDate=${dateend}`)
    const newProdcuts = await data.json();
    setProdXCity(newProdcuts);
  };

  const getProductsCities = async (id) => {
    const data = await fetch(
      `http://ec2-3-144-24-77.us-east-2.compute.amazonaws.com:8080/product/city/${id}`
    );
    const newProducts = await data.json();
    setProdXCity(newProducts);
  }

  const getProductsDatesCities = async (idCity, datestarted, dateended ) => {
    const data = await fetch(
      `http://ec2-3-144-24-77.us-east-2.compute.amazonaws.com:8080/product/city/${idCity}/byDate?startDate=${datestarted}&endDate=${dateended}`
    );
    const newProducts = await data.json();
    setProdXCity(newProducts);
  }

  console.log(datestart, datestart)
  useEffect(() => {
    if( filter===1) {
      getProductsDates(datestart, dateend);
    } else if (filter===2) {
      getProductsCities(id)
    } else if (filter ===3) {
      getProductsDatesCities(id, datestart, dateend)
    }
  }, [datestart, dateend, id]);

  useEffect(() => {
    window.scrollTo(0,0)
  })
  return (
    <>
      <Searcher key="searcher" />
      <div className="list">
        <div className="list-card">
          {prodXCity?.length>0 && prodXCity.map((product) => (
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
