interface CoingeckoMarket {
  id: string;
  symbol: string;
  name: string;
}

export const fetchCoingeckoMarket = async (): Promise<CoingeckoMarket[]> => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/list');

  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error('Failed fetch coingecko market.'));
};
