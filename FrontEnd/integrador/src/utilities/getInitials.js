export const getInitials = (name, lastname) => {
  // console.log(name, lastname);
  const fullName = [name, lastname];
  const initials = [];

  for (const i of fullName) {
    initials.push(i[0]?.toUpperCase());
  }
  return initials.join("");
};

// export default getInitials;
