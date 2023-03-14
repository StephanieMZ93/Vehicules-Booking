import { Categories } from "../components/Categories";
import { Searcher } from "../components/Searcher";
import Products from "../components/Products";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <Searcher />
      <Categories />
      <Products />
    </>
  );
};
