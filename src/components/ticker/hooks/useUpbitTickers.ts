import { TICKER_LIST } from 'constants/constants';
import { useEffect } from 'react';
import { useTickerStore } from 'store/useTickerStore';
import { Ticker } from '../types';

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

export const useUpbitTickers = () => {
  const setTicker = useTickerStore((state) => state.setTickerList);

  useEffect(() => {
    const socket = new WebSocket(UPBIT_WEBSOCKET_URL);

    socket.onopen = () => {
      socket.send(JSON.stringify(WEBSOCKET_REQUEST_PARAMS));
    };

    socket.onmessage = async (event: MessageEvent<Blob>) => {
      const stringData = await event.data.text();
      const ticker: Ticker = JSON.parse(stringData);
      delete ticker.c;
      const newTickerCode = ticker.cd.replace('KRW-', '');
      setTicker(newTickerCode, ticker);
    };

    return () => {
      socket.close();
    };
  }, [setTicker]);
};
