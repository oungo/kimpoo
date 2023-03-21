interface UpbitMarket {
  market: string;
  korean_name: string;
  english_name: string;
  market_warning: 'NONE' | 'CAUTION';
}

export const fetchUpbitMarket = async (): Promise<UpbitMarket[]> => {
  const response = await fetch('https://api.upbit.com/v1/market/all');

  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error('Failed fetch upbit market.'));
};
