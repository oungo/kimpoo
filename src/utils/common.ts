export const formatPrice = (price: number, options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat('ko-KR', options).format(price);

export const formatCurrentPrice = (price: number) =>
  formatPrice(price, { maximumFractionDigits: price < 1 ? 4 : price < 100 ? 2 : 0 });
