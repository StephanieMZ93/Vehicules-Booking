export const getImages = async () => {
  //IMAGES
  const urlImages = `http://ec2-3-144-24-77.us-east-2.compute.amazonaws.com:8080/image`;

  const resp = await fetch(urlImages);
  const { data } = await resp.json();

  const images = data.map((img) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url,
  }));
  // console.log(images);
  return images;
};
