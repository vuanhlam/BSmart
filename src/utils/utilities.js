export const formatPrice = (price) => {
  let newPrice = price;
  if (newPrice) {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "name",
    });
    newPrice = formatter.format(price);
  }
  return newPrice;  
};

