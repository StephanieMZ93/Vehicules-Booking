import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCities } from "../utilities/gets/getCities";
import { ContextGlobal } from "../utilities/globalContext";
import { CalendarDatePicker } from "./CalendarDatePicker";

export const Searcher = () => {
  const [requestCities, setRequestCities] = useState([]);
  const [idCity, setIdCity] = useState();
  const [formData, setFormData] = useState({
    cities: "",
    dates: [],
  });
  const {setFilter} = useContext(ContextGlobal);
  const navigate = useNavigate();

  const handlerOnClick = ({ target }) => {
    console.log("id city");
    console.log(target, "target");
    setIdCity(target.id);
  };
  const OnCityChange = ({ target }) => {
    // console.log(target, "target city")
    setFormData({ ...formData, [target.name]: target.value });
    const index = target.selectedIndex;
    const optionElement = target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    console.log(optionElementId);
    setIdCity(optionElementId);
  };

  const onCalendarChange = (date) => {
    // console.log(dates)
    setFormData({ ...formData, dates: [...date] });
  };

  const handlerOnSubmit = (e) => {
    e.preventDefault();
  
    if (!idCity && formData.dates.length === 0) {
      alert("Please select a city and/or a date to continue.");
      return;
    }
  
    if (!idCity && formData.dates.length > 0) {
      setFilter(1);
      navigate(
        `/search/${formData.dates[0].$d.toLocaleDateString("fr-CA")}/${formData.dates[1].$d.toLocaleDateString(
          "fr-CA"
        )}`
      );
    } else if (idCity && formData.dates.length === 0) {
      setFilter(2);
      navigate(`/city/product/${idCity}`);
    } else if (idCity && formData.dates.length > 0) {
      setFilter(3);
      navigate(
        `/search/${formData.dates[0].$d.toLocaleDateString("fr-CA")}/${formData.dates[1].$d.toLocaleDateString(
          "fr-CA"
        )}/${idCity}`
      );
    }
  };
  
  console.log("GRRR2:", formData);

  const cities = async () => {
    const data = await fetch(
      "http://ec2-3-144-24-77.us-east-2.compute.amazonaws.com:8080/city"
    );
    const newCities = await data.json();
    setRequestCities(newCities);
  };

  useEffect(() => {
    cities();
  }, []);

  return (
    <div className="searcher">
      <h1>
        <p>Search for low fares on vehicles</p>
      </h1>
      <form
        onSubmit={() => handlerOnSubmit}
        className="searcher__form"
        action=""
      >
        <div className="searcher__subcontainer">
          <label className="searcher__label" htmlFor="cities" />

          <select
            className="searcher__cities"
            name="cities"
            id="cities"
            onChange={OnCityChange}
          >
            <option
              className="searcher_cities_options"
              selected
              disabled
              hidden
            >
              Select a city
            </option>
            {requestCities?.map((city) => (
              <option
                className="searcher_cities_options"
                key={city?.id}
                onClick={handlerOnClick}
                value={city?.nameCity}
                id={city?.id}
              >
                {city?.nameCity}
              </option>
            ))}
          </select>
        </div>

        <div className="searcher__subcontainer">
          <label className="searcher__label" htmlFor="checkout" />
          <CalendarDatePicker
            id="checkout"
            onCalendarChange={onCalendarChange}
            placeholder={["Check in", "Check out"]}
          />
        </div>
        {/* <Link to={`/city/product/${idCity}`}> */}
          <button type="submit" className="button--5" onClick={handlerOnSubmit}>
            Search
          </button>
        {/* </Link> */}
      </form>
    </div>
  );
};
