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

export enum DomesticExchangeList {
  UPBIT = 'upbit',
  BITHUMB = 'bithumb',
  COINONE = 'coinone',
}
