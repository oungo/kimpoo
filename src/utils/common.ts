export const formatPrice = (price: number | string, options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat('ko-KR', options).format(Number(price));
