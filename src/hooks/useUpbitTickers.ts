import { DomesticExchange } from '@/components/ticker/types';
import type { DomesticTicker } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { useEffect } from 'react';

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

const convertTicker = async (event: MessageEvent<Blob>) => {
  const socketData = await event.data.text();
  const upbitTicker: UpbitTicker = JSON.parse(socketData);

  const ticker: DomesticTicker = {
    symbol: upbitTicker.cd.split('-')[1],
    currentPrice: upbitTicker.tp,
    changeRate: upbitTicker.scr * 100,
    transactionAmount: upbitTicker.atp24h,
    caution: upbitTicker.mw === 'CAUTION',
  };

  return ticker;
};

export const useUpbitTickers = (domesticExchange: DomesticExchange, symbolList: string[]) => {
  const setTicker = useTickerStore((state) => state.setTicker);
  const setTickerList = useTickerStore((state) => state.setTickerList);
  const setLoadingSocketChange = useTickerStore((state) => state.setLoadingSocketChange);

  useEffect(() => {
    if (
      domesticExchange !== DomesticExchange.UPBIT_KRW &&
      domesticExchange !== DomesticExchange.UPBIT_BTC
    )
      return;

    const socket = new WebSocket(UPBIT_WEBSOCKET_URL);

    socket.onopen = () => {
      const WEBSOCKET_REQUEST_PARAMS = [
        { ticket: 'test' },
        {
          type: 'ticker',
          codes: [
            ...symbolList.map((symbol) =>
              domesticExchange === DomesticExchange.UPBIT_KRW ? `KRW-${symbol}` : `BTC-${symbol}`
            ),
          ],
        },
        {
          format: 'SIMPLE',
        },
      ];

      socket.send(JSON.stringify(WEBSOCKET_REQUEST_PARAMS));
      setLoadingSocketChange(false);
    };

    socket.onmessage = async (event: MessageEvent<Blob>) => {
      const ticker = await convertTicker(event);
      setTicker(ticker.symbol, ticker);
    };

    socket.onclose = () => {
      setTickerList();
      setLoadingSocketChange(true);
    };

    return () => {
      socket.close();
    };
  }, [setTicker, symbolList, domesticExchange, setLoadingSocketChange, setTickerList]);
};
