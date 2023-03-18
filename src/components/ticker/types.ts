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

export interface UpbitTicker {
  /** 마켓 코드  */
  cd: string;
  /** 현재가 */
  tp: number;
  /** 전일 대비 값 */
  scp: number;
  /** 전일 대비 등락율 */
  scr: number;
  /** 24시간 누적 거래대금 */
  atp24h: number;
  /** 52주 최고가 */
  h52wp: number;
  /** 52주 최저가 */
  l52wp: number;
  /** 유의 종목 여부 */
  mw: 'NONE' | 'CAUTION';
  c: string;
}

export interface BinanceTicker {
  /** Symbol */
  s: string;
  /** Close price */
  c: string;
  /** Open price */
  o: string;
  /** High price */
  h: string;
  /** Low price */
  l: string;
  /** Total traded base asset volume */
  v: string;
  /** Total traded quote asset volume  */
  q: string;
}
