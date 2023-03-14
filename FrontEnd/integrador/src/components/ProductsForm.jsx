import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "../utilities/globalContext";
import { ModalGoodResponseProduct } from "./Modal";

export const ProductsForm = () => {
  const { token } = useContext(ContextGlobal);
  const [requestCities, setRequestCities] = useState([]);
  const [requestFeatures, setRequestFeatures] = useState([]);
  const [requestCategories, setRequestCategories] = useState([]);
  const [newImages, setNewImages] = useState(undefined);
  const [newFeatures, setNewFeatures] = useState([]);
  const [nameFeature, setNameFeature] = useState("");
  const [newPolitics, setNewPolitics] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const [openModalGood, setOpenModalGood] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: "",
      description: "",
      brand: "",
      model: "",
      availability: "",
      priceDay: "",
      reserved: false,
      carLicensePlate: "",
      productAverage: 0.0,
      featuresProducts: [],
      image: [],
      category_id: "",
      city_id: "",
    },
  });

  const featuresValidation = () => {
    const autoManLength = newFeatures.filter(
      ({ featureName }) =>
        featureName.includes("Manual") || featureName.includes("Automatic")
    ).length;

    const absLength = newFeatures.filter(({ featureName }) =>
      featureName.includes("ABS")
    ).length;

    const acdLength = newFeatures.filter(({ featureName }) =>
      featureName.includes("Conditioning")
    ).length;

    const volumeLength = newFeatures.filter(({ featureName }) =>
      featureName.includes("Volume")
    ).length;

    const gasLength = newFeatures.filter(
      ({ featureName }) =>
        featureName.includes("Gasoline") ||
        featureName.includes("Diesel") ||
        featureName.includes("Gas") ||
        featureName.includes("Electric")
    ).length;

    const seatsLength = newFeatures.filter(({ featureName }) =>
      featureName.includes("Seats")
    ).length;

    const doorLength = newFeatures.filter(({ featureName }) =>
      featureName.includes("Doors")
    ).length;

    const airbagsLength = newFeatures.filter(({ featureName }) =>
      featureName.includes("Airbags")
    ).length;

    const ageRestrictionLength = newFeatures.filter(({ featureName }) =>
      featureName.includes("Restriction")
    ).length;

    const ageRestrictionValidation = ageRestrictionLength > 1 ? true : false;

    const doorsValidation = doorLength === 0 || doorLength > 1 ? true : false;

    const seatsValidation = seatsLength === 0 || seatsLength > 1 ? true : false;

    const autoManValidation =
      autoManLength === 0 || autoManLength > 1 ? true : false;

    const gasValidation = gasLength === 0 || gasLength > 1 ? true : false;

    const absValidation = absLength === 0 || absLength > 1 ? true : false;

    const acdValidation = acdLength === 0 || acdLength > 1 ? true : false;

    const volumeValidation =
      volumeLength === 0 || volumeLength > 1 ? true : false;

    const airbagsValidation =
      airbagsLength === 0 || airbagsLength > 1 ? true : false;

    if (
      !ageRestrictionValidation &&
      !seatsValidation &&
      !doorsValidation &&
      !airbagsValidation &&
      !volumeValidation &&
      !acdValidation &&
      !absValidation &&
      !gasValidation &&
      !autoManValidation
    ) {
      return;
    } else {
      return (
        <>
          <p>
            {doorsValidation
              ? "Select only one of the options refering to door"
              : null}
          </p>
          <p>
            {seatsValidation
              ? "Select only one of the options containing seats"
              : null}
          </p>
          <p>
            {autoManValidation ? "Select either manual or automatic" : null}
          </p>
          <p>{gasValidation ? "Select one type of fuel" : null}</p>
          <p>
            {absValidation
              ? "Select either if the vehicle has abs system or not"
              : null}
          </p>
          <p>
            {acdValidation
              ? "Select either if the vehicle has air conditioner system or not"
              : null}
          </p>
          <p>
            {airbagsValidation
              ? "Select only one of the options refering to airbags"
              : null}
          </p>
          <p>
            {volumeValidation
              ? "Select only one of the options refering to trunk volume"
              : null}
          </p>
          <p>
            {ageRestrictionValidation
              ? "Select maximum one of the options refering to age restriction"
              : null}
          </p>
        </>
      );
    }
  };

  const imgValidation = () => {
    const mainLength = imagesArray.filter(({ title }) =>
      title.includes("_Main")
    ).length;
    const reservationLength = imagesArray.filter(({ title }) =>
      title.includes("_Reservation")
    ).length;

    const imagesArrayLength = imagesArray.length < 5;
    const mainValidation = mainLength === 0 || mainLength > 1 ? true : false;
    const reservationValidation =
      reservationLength === 0 || reservationLength > 1 ? true : false;

    if (!mainValidation && !reservationValidation && !imagesArrayLength) {
      return true;
    } else {
      return (
        <>
          <p>
            {imagesArrayLength
              ? "The number of images must be at least 5"
              : null}
          </p>
          <p>
            {mainValidation
              ? "There must contain a main image for the carousel"
              : null}
          </p>
          <p>
            {reservationValidation
              ? "There must contain an image with a background for the reservation details card"
              : null}
          </p>
        </>
      );
    }
  };

  //----------------------------------FETCHING----------------------------------------------------
  const cities = async () => {
    const data = await fetch(
      "http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/city"
    );
    const newCities = await data.json();
    setRequestCities(newCities);
  };

  const features = async () => {
    const data = await fetch(
      "http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/feature"
    );
    const getFeatures = await data.json();
    setRequestFeatures(getFeatures);
  };

  const categories = async () => {
    const data = await fetch(
      "http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/category"
    );
    const getCategories = await data.json();
    setRequestCategories(getCategories);
  };

  //---------------------------ONCLICKS-------------------------------------
  const onAddPolitics = () => {
    // setNewPolitics([...newPolitics, { title:politics.title , body: watch("politics") }]);
  };

  const onAddFeature = () => {
    if (
      watch("featuresProducts") === "" ||
      watch("featuresProducts") === undefined
    ) {
      return;
    }

    if (
      newFeatures.filter((feature) => feature.id === watch("featuresProducts"))
        .length === 0
    ) {
      setNewFeatures([
        ...newFeatures,
        { id: watch("featuresProducts"), featureName: nameFeature },
      ]);
    }
  };

  const onDeleteFeature = async ({ target }) => {
    setNewFeatures(newFeatures.filter(({ id }) => id !== target.value));
  };

  const onChangeImage = ({ target }) => {
    setNewImages(target.value);
  };

  const onAddImage = async (e) => {
    e.preventDefault();
    if (
      newImages &&
      watch("title") !== "" &&
      watch("model") !== "" &&
      watch("brand") !== ""
    ) {
      const url = `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/image`;
      const bodyInfo = {
        url: newImages,
        title: watch("brand") + watch("model") + watch("title"),
      };
      const newImage = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token.token,
        },
        body: JSON.stringify(bodyInfo),
      };
      const data = await fetch(url, newImage);
      const response = await data.json();

      if (response) {
        setImagesArray([
          ...imagesArray,
          { id: response.id, url: response.url, title: watch("title") },
        ]);
      }
    }
  };

  const onDeleteImage = async ({ target }) => {
    setImagesArray(imagesArray.filter(({ id }) => id !== ""));
    const url = `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/image/${Number(
      target.value
    )}`;
    const body = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token.token,
      },
    };
    const data = await fetch(url, body);
    const response = await data.status;

    if (response === 200) {
      setImagesArray(
        imagesArray.filter(({ id }) => id !== Number(target.value))
      );
    }
    if (response === 404) {
      setImagesArray(imagesArray.filter(({ id }) => id !== 0));
    }
  };

  const onSubmit = async (data) => {
    const realFeatures = [];
    const realImages = [];
    newFeatures.map(({ id }) => realFeatures.push({ id: id }));
    imagesArray.map(({ id }) => realImages.push({ id: id }));

    const body = {
      productName: data?.productName,
      description: data?.description,
      brand: data?.brand,
      model: data?.model,
      availability: data?.availability,
      priceDay: data?.priceDay,
      reserved: false,
      carLicensePlate: data?.carLicensePlate,
      productAverage: 0.0,
      featuresProducts: [...realFeatures],
      image: [...realImages],
      category_id: data?.category_id,
      city_id: data?.city_id,
    };
    // console.log(body);

    const url = `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/product`;
    const newProduct = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token.token,
      },
      body: JSON.stringify(body),
    };
    const data2 = await fetch(url, newProduct);
    const response = await data2.json();
    if (response.id) {
      setOpenModalGood(true);
    } else if (response.status !== 201) {
      alert("Wrong Request");
    }

    // console.log("RESPONSE_NEWPRODUCT", response);
  };

  useEffect(() => {
    cities();
    features();
    categories();
  }, []);

  useEffect(() => {
    featuresValidation();
  }, [onSubmit]);

  return (
    <>
      <div className="product-form__container">
        {/* ---------------------------------- GENERAL-INFO -------------------------------------- */}
        <h1 className="color-titles"> Sign up A New Vehicle</h1>
        <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="product-form__generalinfo-block">
            <div className="product-form__subcontainer product-form__subcontainer--product-name">
              <label htmlFor="" className="product-form__label">
                Product Name
              </label>
              <input
                type="text"
                className="product-form__input"
                name="productName"
                placeholder="Audi A5 Sportback"
                {...register("productName", {
                  required: "This field is required",
                })}
              />
              <p className="errorMessage">{errors.productName?.message}</p>
            </div>

            <div className="product-form__subcontainer product-form__subcontainer--product-brand">
              <label htmlFor="" className="product-form__label">
                Brand
              </label>
              <input
                type="text"
                className="product-form__input"
                name="brand"
                placeholder="Audi"
                {...register("brand", { required: "This field is required" })}
              />
              <p className="errorMessage">{errors.brand?.message}</p>
            </div>

            <div className="product-form__subcontainer product-form__subcontainer--product-model">
              <label htmlFor="" className="product-form__label">
                Model
              </label>
              <input
                type="text"
                className="product-form__input"
                name="model"
                placeholder="2020"
                {...register("model", { required: "This field is required" })}
              />
              <p className="errorMessage">{errors.model?.message}</p>
            </div>

            <div className="product-form__subcontainer product-form__subcontainer--product-categories">
              <label className="product-form__label" htmlFor="categories">
                Categories
              </label>

              <select
                className="product-form__categories"
                name="category_id"
                id="category_id"
                {...register("category_id", {
                  required: "This field is required",
                })}
              >
                <option
                  className="product-form__options"
                  selected
                  disabled
                  hidden
                  value=""
                  id=""
                >
                  Select a category
                </option>
                {requestCategories?.map((category) => (
                  <option
                    className="product-form__options"
                    key={"product-form__categories" + category?.id}
                    /*    onClick={handlerOnClick} */
                    value={category?.id}
                    id={category?.id}
                  >
                    {category?.title}
                  </option>
                ))}
              </select>
              <p className="errorMessage">{errors.category_id?.message}</p>
            </div>

            <div className="product-form__subcontainer product-form__subcontainer--product-price">
              <label htmlFor="" className="product-form__label">
                Price Per Day
              </label>
              <input
                type="number"
                step={0.01}
                className="product-form__input"
                name="priceDay"
                placeholder="499.99"
                {...register("priceDay", {
                  required: "This field is required",
                })}
              />
              <p className="errorMessage">{errors.priceDay?.message}</p>
            </div>

            <div className="product-form__subcontainer product-form__subcontainer--product-availability">
              <label className="product-form__label" htmlFor="availability">
                Availability
              </label>

              <select
                className="product-form__availability"
                name="availability"
                id="availability"
                placeholder="Select an option"
                {...register("availability", {
                  required: "This field is required",
                })}
              >
                <option className="product-form__options" value="" id="">
                  Select an option
                </option>
                <option className="product-form__options">Low</option>
                <option className="product-form__options">Medium</option>
                <option className="product-form__options">High</option>
              </select>
              <p className="errorMessage">{errors.availability?.message}</p>
            </div>

            <div
              className="product-form__subcontainer
            product-form__subcontainer--product-license"
            >
              <label htmlFor="" className="product-form__label">
                License Plate
              </label>
              <input
                type="text"
                className="product-form__input"
                name="carLicensePlate"
                placeholder="AAA17"
                {...register("carLicensePlate", {
                  required: "This field is required",
                })}
              />
              <p className="errorMessage">{errors.carLicensePlate?.message}</p>
            </div>

            <div className="product-form__subcontainer product-form__subcontainer--product-cities">
              <label className="product-form__label" htmlFor="cities">
                City
              </label>

              <select
                className="product-form__cities"
                name="city_id"
                id="city_id"
                {...register("city_id", {
                  required: "This field is required",
                })}
              >
                <option
                  className="product-form__options"
                  selected
                  disabled
                  hidden
                  value=""
                  id=""
                >
                  Select a city
                </option>
                {requestCities?.map((city) => (
                  <option
                    className="product-form__options"
                    key={city?.id}
                    // onClick={handlerOnClick}
                    value={city?.id}
                    id={city?.id}
                  >
                    {city?.nameCity}
                  </option>
                ))}
              </select>
              <p className="errorMessage">{errors.city_id?.message}</p>
            </div>

            <div className="product-form__subcontainer product-form__subcontainer--product-description">
              <label htmlFor="" className="product-form__label">
                Description
              </label>
              <textarea
                type="text"
                className="product-form__input product-form__textarea"
                name="description"
                placeholder="Provide a description of the product..."
                {...register("description", {
                  required: "This field is required",
                })}
              />
            </div>
          </div>
          {/* ----------------------------------------FEATURES-------------------------------------- */}
          <div className="product-form__features-block">
            <h2 className="color-titles">Add Features</h2>
            <div className="product-form__subcontainer product-form__features-block--first-row">
              <label className="product-form__label" htmlFor="features" />
              <select
                className="product-form__features product-form__features-1"
                name="featuresProducts"
                id="featuresProducts"
                {...register("featuresProducts", {
                  required: "This field is required",
                  validate: featuresValidation,
                })}
              >
                <option
                  className="product-form__options"
                  selected
                  disabled
                  hidden
                  value=""
                  id="-1"
                >
                  Select a feature
                </option>
                {requestFeatures?.map((feature) => (
                  <option
                    className="product-form__options"
                    key={feature?.id}
                    onClick={({ target }) => setNameFeature(target?.label)}
                    value={feature?.id}
                    id={feature?.id}
                    label={feature?.nameFeature}
                  >
                    {feature?.nameFeature}
                  </option>
                ))}
              </select>
              <div className="errorMessage errorsFeatures">
                {errors.featuresProducts?.message}
              </div>
            </div>
            <button
              className="button__plus button__plus--img"
              onClick={onAddFeature}
            >
              +
            </button>
            <div className="product-form__features-block product-form__features-block--newfeatures">
              {newFeatures.map((feature) => (
                <>
                  <div
                    className="product-form__subcontainer"
                    key={
                      "product-form__features-block product-form__features-block--newfeatures" +
                      feature.id
                    }
                  >
                    <input
                      type="text"
                      className="product-form__input"
                      value={feature.featureName}
                      disabled
                    />
                  </div>
                  <button
                    className="button__delete"
                    value={feature.id}
                    onClick={onDeleteFeature}
                  >
                    X
                  </button>
                </>
              ))}
            </div>
          </div>
          {/* ---------------------------------POLITICS-TERMS--------------------------------------- */}
          {/* <div className="product-form__politics-block">
            <h2 className="color-titles">Terms & Conditions</h2>
            <div className="product-form__politics-block--first-row">
              <label className="product-form__label" htmlFor="politics" />
              <select
                className="product-form__politic"
                name="politics"
                id="politics"
                {...register("politics", {
                  required: "This field is required",
                })}
              >
                <option
                  className="product-form_options"
                  selected
                  disabled
                  hidden
                >
                  Select a policy
                </option>
                {requestFeatures?.map((feature) => (
                  <option
                    className="product-form__options"
                    key={"product-form__options" + feature?.id}
                    value={feature?.nameFeature}
                    id={feature?.id}
                  >
                    {feature?.nameFeature}
                  </option>
                ))}
              </select>
              <button
                className="button__plus button__plus--politics"
                onClick={onAddPolitics}
              >
                +
              </button>
            </div>
            <div className="product-form__politics-block product-form__politics-block--newpolitics">
              {newFeatures.map((feature) => (
                <>
                  <div className="product-form__subcontainer product-form__subcontainer--politics">
                    <h3>{feature.id}</h3>
                    <label htmlFor="" className="product-form__label">
                      Description
                    </label>
                    <textarea
                      type="text"
                      className="product-form__input
                product-form__textarea--2
                "
                      name="politics-description"
                      placeholder="write the terms related to this policy"
                      {...register("politics-description", {
                        required: "This field is required",
                      })}
                    />
                    <button className="button__delete--small button__delete-subcontainer">
                      X
                    </button>
                  </div>
                </>
              ))}
            </div> */}
          {/* THE UPWARDS COMMENTED CODE IS THE ONE TESTED */}

          {/* ----------------------------------------IMAGES-------------------------------------- */}
          <div className="product-form__images-block">
            <h2 className="color-titles">Vehicule Images</h2>
            <div className="product-form__subcontainer product-form__images-block--first-row">
              <select
                name="title"
                {...register("title", {
                  required: "This field is required",
                })}
              >
                <option disabled selected value="" id="-1">
                  Select the type of image
                </option>
                <option name="_Main" value={"_Main"}>
                  Carrusel's Main Image
                </option>
                <option name="_Front" value={"_Front"}>
                  Front Image
                </option>
                <option name="_Back" value={"_Back"}>
                  Back Image
                </option>
                <option name="_Inside" value={"_Inside"}>
                  Inside Image
                </option>
                <option name="_Side" value={"_Side"}>
                  Side Image
                </option>
                <option name="_Trunk" value={"_Trunk"}>
                  Trunk Image
                </option>
                <option name="_Reservation" value={"_Reservation"}>
                  Reservation Card Image
                </option>
                <option name="_Others" value={"_Others"}>
                  Other Image
                </option>
              </select>
              <div className="errorMessage errorsImages">
                {errors.image?.message}
              </div>
              <input
                type="text"
                className="product-form__input product-form__input--img"
                name="image"
                placeholder="http://exampleImage.png"
                {...register("image", {
                  required: "This field is required",
                  validate: imgValidation,
                })}
                onChange={onChangeImage}
              />
            </div>
            <button
              className="button__plus button__plus--img"
              onClick={onAddImage}
            >
              +
            </button>
            <div className="product-form__images-block product-form__images-block--newimgs">
              {imagesArray?.map(({ url, id, title }) => (
                <>
                  <div
                    className="product-form__subcontainer"
                    key={"product-form__images-block--newimgs" + id}
                  >
                    <label htmlFor="" className="product-form__label">
                      {title}
                    </label>
                    <input
                      type="text"
                      className="product-form__input"
                      value={url}
                      disabled
                    />
                  </div>
                  <button
                    className="button__delete"
                    value={id}
                    onClick={onDeleteImage}
                  >
                    X
                  </button>
                </>
              ))}
            </div>
          </div>
          <button className="button--5 product-form__button" type="submit">
            Confirm
          </button>
        </form>
      </div>
      {<ModalGoodResponseProduct open={openModalGood} />}
    </>
  );
};

