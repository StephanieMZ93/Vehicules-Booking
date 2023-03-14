import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { Searcher } from "../components/Searcher";
import { ContextGlobal } from "../utilities/globalContext";

export const ProductXCity = () => {
  const [prodXCity, setProdXCity] = useState();
  const { datestart, dateend, id } = useParams();
  const { filter } = useContext(ContextGlobal);

  const getProductsDates = async (datestart, dateend) => {
    const data = await fetch(
      `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/product/byDate?startDate=${datestart}&endDate=${dateend}`
    );
    const newProdcuts = await data.json();
    setProdXCity(newProdcuts);
  };

  const getProductsCities = async (id) => {
    const data = await fetch(
      `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/product/city/${id}`
    );
    const newProducts = await data.json();
    setProdXCity(newProducts);
  };

  const getProductsDatesCities = async (idCity, datestarted, dateended) => {
    const data = await fetch(
      `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/product/city/${idCity}/byDate?startDate=${datestarted}&endDate=${dateended}`
    );
    const newProducts = await data.json();
    setProdXCity(newProducts);
  };

  // console.log(datestart, datestart);
  useEffect(() => {
    if (filter === 1) {
      getProductsDates(datestart, dateend);
    } else if (filter === 2) {
      getProductsCities(id);
    } else if (filter === 3) {
      getProductsDatesCities(id, datestart, dateend);
    }
  }, [datestart, dateend, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Searcher key="searcher" />
      <div className="list">
        <div className="list-card">
          {prodXCity?.length > 0  ? 
            prodXCity.map((product) => (
              <Card key={product.productName} product={product} />
            ))
            : prodXCity && prodXCity.length === 0 ?
            <div className="not-booking">
          <div>
          No products available
          <img src="https://cdn-icons-png.flaticon.com/512/1076/1076745.png" alt="logo-notBookng" />
          </div>
          
        </div>
        : null
            }
            
        </div>
      </div>
          
    </>
  );
};
