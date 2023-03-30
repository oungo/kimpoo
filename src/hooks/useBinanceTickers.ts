import type { OverseasTicker } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { useEffect } from 'react';

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

export const useBinanceTickers = (symbolList: string[]) => {
  const setTicker = useTickerStore((state) => state.setTicker);

  useEffect(() => {
    if (!symbolList) return;

    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      const WEBSOCKET_REQUEST_PARAMS = {
        method: 'SUBSCRIBE',
        params: symbolList.map((symbol) => `${symbol.toLowerCase()}usdt@miniTicker`),
        id: 1,
      };

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

      setTicker(symbol, newData);
    };

    return () => {
      socket.close();
    };
  }, [setTicker, symbolList]);
};
