import { HeaderBlockWithoutCity } from "../components/HeaderBlock";
import { ProductsForm } from "../components/ProductsForm";
export const Manager = () => {
  return (
    <>
      <div className="aux-top">
        <HeaderBlockWithoutCity />
      </div>
      <div className="manager">
        <ProductsForm />
      </div>
    </>
  );
};
