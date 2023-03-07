export const formatPrice = (price: number | string, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('ko-KR', options).format(Number(price));
};
