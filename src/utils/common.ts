export const formatPrice = (price: number | string, options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat('ko-KR', options).format(Number(price));

export const formatCurrentPrice = (price: number) => {
  if (price < 1) return price;
  return formatPrice(price, { maximumFractionDigits: price < 100 ? 2 : 0 });
};
