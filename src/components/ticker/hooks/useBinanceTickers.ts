import { TICKER_LIST } from 'constants/constants';
import { useState, useEffect } from 'react';
import { BinanceTicker } from '../types';

const WEBSOCKET_URL = 'wss://stream.binance.com:9443/ws';
const WEBSOCKET_REQUEST_PARAMS = {
  method: 'SUBSCRIBE',
  params: TICKER_LIST.map((ticker) => `${ticker.toLowerCase()}usdt@miniTicker`),
  id: 1,
};

export const useBinanceTickers = () => {
  const [tickers, setTickers] = useState<Map<BinanceTicker['s'], BinanceTicker>>(new Map());

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      socket.send(JSON.stringify(WEBSOCKET_REQUEST_PARAMS));
    };

    socket.onmessage = async (event) => {
      const ticker: BinanceTicker = JSON.parse(event.data);
      setTickers((prev) => new Map(prev).set(ticker.s, ticker));
    };

    return () => {
      socket.close();
    };
  }, []);

  return tickers;
};
