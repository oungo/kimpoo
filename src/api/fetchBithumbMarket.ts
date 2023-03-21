interface BithumbMarket {
  status: string;
  data: Record<string, BithumbResponse>;
}

interface BithumbResponse {
  acc_trade_value: string;
  acc_trade_value_24H: string;
  closing_price: string;
  fluctate_24H: string;
  fluctate_rate_24H: string;
  max_price: string;
  min_price: string;
  opening_price: string;
  prev_closing_price: string;
  units_traded: string;
  units_traded_24H: string;
}

export const fetchBithumbMarket = async (): Promise<BithumbMarket> => {
  const response = await fetch('https://api.bithumb.com/public/ticker/ALL_KRW');

  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error('Failed fetch upbit market.'));
};
