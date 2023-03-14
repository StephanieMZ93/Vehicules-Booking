export const getCategory = async (id) => {
  //CATEGORIES
  const urlCategory = `http://ec2-18-222-230-254.us-east-2.compute.amazonaws.com:8080/category/${id}`;

  const resp = await fetch(urlCategory);
  const { data } = await resp.json();

  const category = data.map((ctgry) => ({
    id: ctgry.id,
    title: ctgry.title,
    url: ctgry.images.downsized_medium.url,
  }));
  // console.log(category);
  return category;
};
