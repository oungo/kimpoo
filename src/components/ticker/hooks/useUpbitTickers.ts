import { TICKER_LIST } from 'constants/constants';
import { useEffect } from 'react';
import { useTickerStore } from 'store/useTickerStore';
import { DomesticExchangeList, DomesticTicker } from '../types';

interface UpbitTicker {
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

const UPBIT_WEBSOCKET_URL = 'wss://api.upbit.com/websocket/v1';
const WEBSOCKET_REQUEST_PARAMS = [
  { ticket: 'test' },
  {
    type: 'ticker',
    codes: TICKER_LIST.map((ticker) => `KRW-${ticker}`),
  },
  {
    format: 'SIMPLE',
  },
];

export const useUpbitTickers = (domesticExchange: DomesticExchangeList) => {
  const setTicker = useTickerStore((state) => state.setTickerList);
  const initializeTickerList = useTickerStore((state) => state.initializeTickerList);
  const setLoadingSocketChange = useTickerStore((state) => state.setLoadingSocketChange);

  useEffect(() => {
    if (domesticExchange !== DomesticExchangeList.UPBIT) return;

    const socket = new WebSocket(UPBIT_WEBSOCKET_URL);

    socket.onopen = () => {
      setLoadingSocketChange(false);
      socket.send(JSON.stringify(WEBSOCKET_REQUEST_PARAMS));
    };

    socket.onmessage = async (event: MessageEvent<Blob>) => {
      const stringData = await event.data.text();
      const ticker: UpbitTicker = JSON.parse(stringData);

      const symbol = ticker.cd.replace('KRW-', '');
      const newData: DomesticTicker = {
        symbol,
        currentPrice: ticker.tp,
        changeRate: ticker.scr * 100,
        transactionAmount: ticker.atp24h,
        caution: ticker.mw === 'CAUTION',
      };

      setTicker(symbol, newData);
    };

    return () => {
      setLoadingSocketChange(true);
      initializeTickerList();
      socket.close();
    };
  }, [setTicker, domesticExchange, setLoadingSocketChange, initializeTickerList]);
};
