import { Categories } from "../components/Categories";
import { Searcher } from "../components/Searcher";
import Products from "../components/Products";
import products from "../data/products.json";
import CalendarBooking from "../components/CalendarBooking";

export const Home = () => {
  return (
    <>
      <Searcher />
      <Categories />
      <Products />
    </>
  );
};
