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

export enum DomesticExchange {
  UPBIT_KRW = 'UPBIT_KRW',
  UPBIT_BTC = 'UPBIT_BTC',
  BITHUMB = 'BITHUMB',
}

export enum OverseasExchange {
  BINANCE_USDT = 'BINANCE_USDT',
  BINANCE_BUSD = 'BINANCE_BUSD',
}

export interface Coin {
  name: string;
  symbol: string;
  thumb: string;
}
