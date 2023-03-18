import { TICKER_LIST } from 'constants/constants';
import { useEffect } from 'react';
import { useTickerStore } from 'store/useTickerStore';
import { OverseasTicker } from '../types';

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

const WEBSOCKET_URL = 'wss://stream.binance.com:9443/ws';
const WEBSOCKET_REQUEST_PARAMS = {
  method: 'SUBSCRIBE',
  params: TICKER_LIST.map((ticker) => `${ticker.toLowerCase()}usdt@miniTicker`),
  id: 1,
};

export const useBinanceTickers = () => {
  const setTickerList = useTickerStore((state) => state.setTickerList);

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      socket.send(JSON.stringify(WEBSOCKET_REQUEST_PARAMS));
    };

    socket.onmessage = async (event: MessageEvent<string>) => {
      const ticker: BinanceTicker = JSON.parse(event.data);
      if (!ticker.s) return;

      const symbol = ticker.s.replace('USDT', '');
      const newData: OverseasTicker = {
        oSymbol: symbol,
        oCurrentPrice: Number(ticker.c),
        oTransactionAmount: Number(ticker.q),
      };

      setTickerList(symbol, newData);
    };

    return () => {
      socket.close();
    };
  }, [setTickerList]);
};
