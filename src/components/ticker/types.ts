export type Ticker = DomesticTicker & OverseasTicker;

export interface DomesticTicker {
  symbol: string;
  currentPrice: number;
  changeRate: number;
  transactionAmount: number;
  caution?: boolean;
}

type PickedOverseasTicker = Pick<DomesticTicker, 'symbol' | 'currentPrice' | 'transactionAmount'>;
export type OverseasTicker = {
  [Property in keyof PickedOverseasTicker as `o${Capitalize<Property>}`]: DomesticTicker[Property];
};

export enum DomesticExchange {
  UPBIT_KRW = 'UPBIT_KRW',
  UPBIT_BTC = 'UPBIT_BTC',
  BITHUMB = 'BITHUMB',
}

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}
