import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Routes/Home";
import { Signin } from "./Routes/Signin";
import Login from "./Routes/Login";
import SignInForm from "./components/SignInForm";
import DatailProduct from "./Routes/DetailProduct";
import CarouselImg from "./components/CarouselImg";
import { ProductsXCategory } from "./Routes/ProductsXCategory";
import { ProductXCity } from "./Routes/ProductXCity";
import Reserv from "./Routes/Reserv";
import Confirm from "./Routes/Confirm";
import { Manager } from "./Routes/Manager";
import BookingUser from "./Routes/BookingUser";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index path="/home" element={<Home />} />
          <Route path="/detalle" element={<DatailProduct />}></Route>
          {/* <Route path="/signin" element={<Signin />} /> */}
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/login" element={<Login />} />
          <Route
            path="/category/product/:id"
            element={<ProductsXCategory />}
          ></Route>
          <Route path="/product/detail/:id" element={<DatailProduct />}></Route>
          <Route path="/city/product/:id" element={<ProductXCity />}></Route>
          <Route
            path="/search/:datestart/:dateend"
            element={<ProductXCity />}
          />
          <Route
            path="/search/:datestart/:dateend/:id"
            element={<ProductXCity />}
          />
          <Route path="/product/reservation/:id" element={<Reserv />}></Route>
          <Route
            path="/product/reservation/:id/confirm"
            element={<Confirm />}
          />
          <Route path="/manager" element={<Manager />} />
          <Route path="*" element={<h1>Page not Found</h1>} />
          <Route path="/reservas/:userId" element={<BookingUser></BookingUser>}></Route>
          {/* <Route path="/imgs" element={<CarouselImg></CarouselImg>}></Route> */}
          {/* <Route path="/product/:id/reserv" element={<Reserv />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
