export const formatPrice = (price: number | string) => {
  return new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 2 }).format(Number(price));
};

export const formatPriceText = (price: number | string) => {
  return new Intl.NumberFormat('ko-KR', { currency: 'KRW', notation: 'compact' }).format(
    Number(price)
  );
};
