import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowflake,
  faIdCard,
  faSquare,
  faGasPump,
  faCircle,
  faTimeline,
  faRightFromBracket,
  faChair,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FeaturesIcon({ product }) {
  // const [features, setFeatures] = useState([]);
  // const [product, setProduct] =useState();
  // const {id} = useParams();
  // const urlFeatures = "http://localhost:8080/feature"
  // const urlProduct = `http://localhost:8080/product/${id}`

  // async function getFeatures(url, setState) {
  // const data = await fetch(url);
  // const response = await data.json();
  // setState(response);
  // }

  // useEffect(() => {
  // getFeatures(urlProduct, setProduct)
  // }, []);

  // console.log(features);

  return (
    <div className="features">
      <h2 className="features__title">What features does this vehicle have?</h2>
      <div className="features__container">
        {product?.featuresProducts.map((feature) => (
          <div key={feature.id} className="features__card">
            <div
              className="features__img"
              style={{ backgroundImage: `url(${feature.url})` }}
            ></div>
            <span>{feature.nameFeature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesIcon;
