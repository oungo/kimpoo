import type { OverseasExchange, OverseasTicker } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { formatCurrentPrice, formatPrice } from '@/utils/common';
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

export const useBinanceTickers = (overseasExchange: OverseasExchange, symbolList: string[]) => {
  const { data: quotation } = useQuotationQuery();

  const setTicker = useTickerStore((state) => state.setTicker);

  useEffect(() => {
    if (!symbolList) return;

    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      const WEBSOCKET_REQUEST_PARAMS = {
        method: 'SUBSCRIBE',
        params: symbolList.map((symbol) => makeTickerName(symbol, overseasExchange)),
        id: 1,
      };

      socket.send(JSON.stringify(WEBSOCKET_REQUEST_PARAMS));
    };

    socket.onmessage = async (event: MessageEvent<string>) => {
      const ticker: BinanceTicker = JSON.parse(event.data);
      if (!ticker.s) return;

      const symbol = ticker.s.replace(overseasExchange.split('_')[1], '');

      const newData: OverseasTicker = {
        oSymbol: symbol,
        oCurrentPrice: parseFloat(ticker.c) * quotation.basePrice,
        oFormattedCurrentPrice: formatCurrentPrice(parseFloat(ticker.c) * quotation.basePrice),
        oTransactionAmount: parseFloat(ticker.q),
        oFormattedTransactionAmount: formatPrice(parseFloat(ticker.q) * quotation.basePrice, {
          notation: 'compact',
        }),
      };

      setTicker(symbol, newData);
    };

    return () => {
      socket.close();
    };
  }, [setTicker, symbolList, overseasExchange, quotation.basePrice]);
};
