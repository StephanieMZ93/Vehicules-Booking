export const getCities = async () => {
  //CITIES
  const urlCities = `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/city`;

  const resp = await fetch(urlCities);
  const data = await resp.json();

  const cities = data;

  // console.log(cities);
  return cities;
};
