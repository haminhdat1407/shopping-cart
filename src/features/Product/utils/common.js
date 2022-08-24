export const formatPrice = (price) => {
  if (!price) return;
  const productPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
  return productPrice;
};

export const formatPromotionPercent = (percent) => {
  if (!percent) return;
  return percent === 0 ? '' : ` -${percent}%`;
};
