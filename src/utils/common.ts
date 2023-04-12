export const formatNumber = (number: number, options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat('ko-KR', options).format(number);

export const formatCurrentPrice = (price: number) =>
  formatNumber(price, { maximumFractionDigits: price < 1 ? 4 : price < 100 ? 2 : 0 });
