export function formatMoney(number) {
  const isValidNumber = typeof number == "number" && !isNaN(number);
  console.log("isValidNumber", isValidNumber);
  if (!isValidNumber) {
    return "Invalid number";
  }

  const formattedNumber = number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formattedNumber.replace(/₫/g, "").replace(/,/g, ".");
}
