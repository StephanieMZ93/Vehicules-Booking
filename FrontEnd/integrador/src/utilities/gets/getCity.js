export const getCity = async (id) => {
  //CITY
  const urlCity = `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/city/${id}`;

  const resp = await fetch(urlCity);
  const { data } = await resp.json();

  const city = data.map((cty) => ({
    id: cty.id,
    title: cty.title,
    url: cty.images.downsized_medium.url,
  }));
  // console.log(city);
  return city;
};
