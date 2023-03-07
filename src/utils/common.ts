export const formatPrice = (price: number | string, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('ko-KR', options).format(Number(price));
};

export const formatPriceText = (price: number | string) => {
  return new Intl.NumberFormat('ko-KR', { currency: 'KRW', notation: 'compact' }).format(
    Number(price)
  );
};
