import { TICKER_LIST } from 'constants/constants';
import { useEffect } from 'react';
import { useTickerStore } from 'store/useTickerStore';
import { Ticker } from '../types';

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

    socket.onmessage = async (event) => {
      const ticker: Ticker = JSON.parse(event.data);
      const newTickerCode = ticker.s?.replace('USDT', '');
      setTickerList(newTickerCode, ticker);
    };

    return () => {
      socket.close();
    };
  }, [setTickerList]);
};
