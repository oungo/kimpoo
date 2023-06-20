export interface UpbitMarket {
  market: string;
  korean_name: string;
  english_name: string;
  market_warning: 'NONE' | 'CAUTION';
}

export const getUpbitMarket = async (type: 'BTC' | 'KRW' = 'KRW'): Promise<UpbitMarket[]> => {
  const response = await fetch('https://api.upbit.com/v1/market/all', { cache: 'no-store' });

  if (response.ok) {
    const upbitMarket: UpbitMarket[] = await response.json();
    const newMarketData = upbitMarket
      .filter(({ market }) => market.startsWith(type))
      .map((data) => ({ ...data, market: data.market.split('-')[1] }));

    return newMarketData;
  }

  return Promise.reject(new Error('Failed fetch upbit market.'));
};
