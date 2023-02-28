export const getRandomProducts = async () => {
  // RANDOM PRODUCTS
  // const urlRandomProduct = `https://localhost:8080/product/Random`;

  // const resp = await fetch(urlRandomProduct);
  // const data = await resp.json();

  // const products = data;
  // // console.log(products);
  // return products;

  const urlProducts = `http://ec2-3-144-24-77.us-east-2.compute.amazonaws.com:8080/product`;

  const resp = await fetch(urlProducts);
  const data = await resp.json();

  const products = await data;
  console.log("UTILITIES_DATA: ", data);
  return products;
};
