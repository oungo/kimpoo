import { TICKER_LIST } from 'constants/constants';
import { useState, useEffect } from 'react';
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

export const useTickers = () => {
  const [tickers, setTickers] = useState<Map<Ticker['cd'], Ticker>>(new Map());

  useEffect(() => {
    const socket = new WebSocket(UPBIT_WEBSOCKET_URL);

    socket.onopen = () => {
      socket.send(JSON.stringify(WEBSOCKET_REQUEST_PARAMS));
    };

    socket.onmessage = async (event: MessageEvent<Blob>) => {
      const stringData = await event.data.text();
      const ticker: Ticker = JSON.parse(stringData);
      setTickers((prev) => new Map(prev).set(ticker.cd, ticker));
    };

    return () => {
      socket.close();
    };
  }, []);

  return tickers;
};
