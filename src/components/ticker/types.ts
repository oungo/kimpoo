export type Ticker = DomesticTicker & Partial<OverseasTicker> & { premium?: number };

export interface DomesticTicker {
  symbol: string;
  currentPrice: number;
  changeRate: number;
  transactionAmount: number;
  caution?: boolean;
}

type PickedDomesticTicker = Pick<DomesticTicker, 'currentPrice' | 'transactionAmount'>;
export type OverseasTicker = {
  [Property in keyof PickedDomesticTicker as `o${Capitalize<Property>}`]: DomesticTicker[Property];
};

export type DomesticExchange = 'UPBIT_KRW' | 'UPBIT_BTC' | 'BITHUMB';
export type OverseasExchange = 'BINANCE_USDT' | 'BINANCE_BUSD';

export interface Coin {
  symbol: string;
  thumb: string;
}
