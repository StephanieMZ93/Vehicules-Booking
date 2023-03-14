export const getProductXCity = async (id) => {
  // PRODUCT PER CITY
  const urlProductXCity = `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/product/city/${id}`;

  const resp = await fetch(urlProductXCity);
  const { data } = await resp.json();

  const product = data;
  return product;
};
