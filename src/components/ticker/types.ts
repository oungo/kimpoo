export type Ticker = DomesticTicker & OverseasTicker & { premium?: string };

export interface DomesticTicker {
  symbol: string;
  currentPrice: number;
  formattedCurrentPrice: string;
  changeRate: number;
  transactionAmount: number;
  formattedTransactionAmount: string;
  caution?: boolean;
}

type PickedOverseasTicker = Pick<
  DomesticTicker,
  | 'symbol'
  | 'currentPrice'
  | 'transactionAmount'
  | 'formattedCurrentPrice'
  | 'formattedTransactionAmount'
>;
export type OverseasTicker = {
  [Property in keyof PickedOverseasTicker as `o${Capitalize<Property>}`]: DomesticTicker[Property];
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
