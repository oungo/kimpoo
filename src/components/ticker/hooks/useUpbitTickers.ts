import { TICKER_LIST } from 'constants/constants';
import { useEffect } from 'react';
import { useTickerStore } from 'store/useTickerStore';
import { DomesticTicker, UpbitTicker } from '../types';

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
      socket.close();
    };
  }, [setTicker]);
};
