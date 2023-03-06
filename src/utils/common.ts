export const formatPrice = (price: number | string, maximumFractionDigits = 2) => {
  return new Intl.NumberFormat('ko-KR', { maximumFractionDigits }).format(Number(price));
};

export const formatPriceText = (price: number | string) => {
  return new Intl.NumberFormat('ko-KR', { currency: 'KRW', notation: 'compact' }).format(
    Number(price)
  );
};
