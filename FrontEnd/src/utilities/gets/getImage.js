export const getImage = async (id) => {
  //IMAGES
  const urlImage = `http://ec2-3-144-24-77.us-east-2.compute.amazonaws.com:8080/image/${id}`;

  const resp = await fetch(urlImage);
  const { data } = await resp.json();

  const image = data.map((img) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url,
  }));
  // console.log(image);
  return image;
};
