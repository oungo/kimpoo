export interface BithumbMarket {
  status: string;
  data: BithumbTicker[];
}

type BithumbTicker = Omit<OriginBithumbTicker, 'acc_trade_value_24H' | 'closing_price' | 'prev_closing_price'> & {
  symbol: string;
  acc_trade_value_24H: number;
  closing_price: number;
  prev_closing_price: number;
};

interface OriginBithumbTicker {
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

type JSONResponse = {
  status: string;
  data: Record<string, OriginBithumbTicker>;
};

export const fetchBithumbMarket = async (): Promise<BithumbMarket> => {
  const response = await fetch('https://api.bithumb.com/public/ticker/ALL_KRW');

  if (response.ok) {
    const { status, data }: JSONResponse = await response.json();

    const newMarket: BithumbMarket['data'] = [];
    for (const symbol in data) {
      if (symbol === 'date') continue;

      const ticker = data[symbol];
      newMarket.push({
        ...ticker,
        symbol,
        acc_trade_value_24H: parseFloat(ticker.acc_trade_value_24H),
        closing_price: parseFloat(ticker.closing_price),
        prev_closing_price: parseFloat(ticker.prev_closing_price),
      });
    }

    return { status, data: newMarket };
  }

  return Promise.reject(new Error('Failed fetch bithumb market.'));
};
