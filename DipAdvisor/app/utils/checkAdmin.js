export const checkAdmin = (user) => {
  const lowerCaseEmail = user.email.toLowerCase();
  if (
    lowerCaseEmail === "ben@swim.com" ||
    lowerCaseEmail === "alex.wignall1@gmail.com" ||
    lowerCaseEmail === "mdmosley12@gmail.com" ||
    lowerCaseEmail === "lewisbrown3108@gmail.com"
  )
    return false;
  else return true;
};
