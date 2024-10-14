export const formatPhoneNumber = (number) => {
  var num = number.toString();
  return num.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
};
