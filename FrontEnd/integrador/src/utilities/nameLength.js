export const nameLength = (name, lastName) => {
  const fullName = `${name} ${lastName}`.toLowerCase();
  const nameArray = fullName.split(" ");
  if (fullName.length <= 11) {
    return nameArray
      .map((name) => name[0].toUpperCase() + name.slice(1, name.length))
      .join(" ");
  } else {
    return name;
  }

  // return fullName.length <= 11 ? fullName : name;
};
