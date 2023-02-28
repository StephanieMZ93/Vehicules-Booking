export const getProductsXCategory = async (id) => {
  //CATEGORIES
  const urlProductsXCategory = `http://ec2-3-144-24-77.us-east-2.compute.amazonaws.com:8080/product/category/${id}`;

  const resp = await fetch(urlProductsXCategory);
  const data = await resp.json();

  const category = await data;
  console.log("FROM PRODUCTSXCATEGORY:", category);
  return category;
};

//aasdqw
//asdqwe
