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
  UPBIT = 'upbit',
  BITHUMB = 'bithumb',
  COINONE = 'coinone',
}

export interface Coins {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}
