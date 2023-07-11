export const formatNumber = (number: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('ko-KR', options).format(number);
};

export const formatCurrentPrice = (price: number) => {
  return formatNumber(price, { maximumFractionDigits: price < 1 ? 4 : price < 100 ? 2 : 0 });
};

export const formatPercent = (number: number) => {
  return formatNumber(number, { signDisplay: 'exceptZero', minimumFractionDigits: 2, style: 'percent' });
};

export const createUpbitSymbolIconUrl = (symbol: string) => `https://static.upbit.com/logos/${symbol}.png`;
