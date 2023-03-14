export const getProducts = async () => {
  //PRODUCT
  const urlProducts = `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/product`;

  const resp = await fetch(url);
  const { data } = await resp.json();

  const products = data.map((prd) => ({
    id: prd.id,
    title: prd.title,
    url: prd.images.downsized_medium.url,
  }));
  // console.log(products);
  return products;
};
