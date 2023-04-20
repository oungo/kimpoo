import type { OverseasExchange, OverseasTicker } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { useQuotationQuery } from './useQuotationQuery';
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

const makeTickerName = (symbol: string, overseasExchange: OverseasExchange) =>
  `${symbol.toLowerCase()}${overseasExchange.toLowerCase().split('_')[1]}@miniTicker`;

export const useBinanceTickers = () => {
  const { data: quotation } = useQuotationQuery();

  const symbolList = useTickerStore((state) => state.symbolList);
  const setTicker = useTickerStore((state) => state.setTicker);
  const { domesticExchange, overseasExchange } = useTickerStore((state) => ({
    domesticExchange: state.domesticExchange,
    overseasExchange: state.overseasExchange,
  }));

  useEffect(() => {
    if (!symbolList || !quotation) return;

    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      const WEBSOCKET_REQUEST_PARAMS = {
        id: 1,
        method: 'SUBSCRIBE',
        params: symbolList.map((symbol) => makeTickerName(symbol, overseasExchange)),
      };

      socket.send(JSON.stringify(WEBSOCKET_REQUEST_PARAMS));
    };

    const map = new Map<string, OverseasTicker>();

    const updateTicker = () => {
      [...map.entries()].forEach(([symbol, ticker]) => {
        setTicker(symbol, ticker);
        map.clear();
      });
    };

    const intervalId = setInterval(updateTicker, 500);

    socket.onmessage = async (event: MessageEvent<string>) => {
      const ticker: BinanceTicker = JSON.parse(event.data);
      if (!ticker.s) return;

      const newData = {
        oCurrentPrice: parseFloat(ticker.c) * quotation.basePrice,
        oTransactionAmount: parseFloat(ticker.q) * quotation.basePrice,
      };

      const symbol = ticker.s.replace(overseasExchange.split('_')[1], '');
      map.set(symbol, newData);
    };

    return () => {
      clearInterval(intervalId);
      socket.close();
    };
  }, [setTicker, symbolList, overseasExchange, quotation, domesticExchange]);
};
