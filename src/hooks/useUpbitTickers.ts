import { DomesticExchange } from '@/components/ticker/types';
import type { DomesticTicker } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { useEffect, useRef } from 'react';

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
    changeRate: parseFloat((upbitTicker.scr * 100).toFixed(2)),
    transactionAmount: upbitTicker.atp24h,
    caution: upbitTicker.mw === 'CAUTION',
  };

  return ticker;
};

export const useUpbitTickers = (symbolList: string[]) => {
  const btcPriceRef = useRef(0);

  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const setTicker = useTickerStore((state) => state.setTicker);
  const setTickerList = useTickerStore((state) => state.setTickerList);

  const isKRWMarket = domesticExchange === DomesticExchange.UPBIT_KRW;

  useEffect(() => {
    if (
      domesticExchange !== DomesticExchange.UPBIT_KRW &&
      domesticExchange !== DomesticExchange.UPBIT_BTC
    )
      return;

    const socket = new WebSocket(UPBIT_WEBSOCKET_URL);

    socket.onopen = () => {
      const prefixedSymbolList = symbolList.map((symbol) =>
        isKRWMarket ? `KRW-${symbol}` : `BTC-${symbol}`
      );
      const WEBSOCKET_REQUEST_PARAMS = [
        { ticket: 'test' },
        {
          type: 'ticker',
          codes: isKRWMarket ? prefixedSymbolList : prefixedSymbolList.concat('KRW-BTC'),
        },
        {
          format: 'SIMPLE',
        },
      ];

      socket.send(JSON.stringify(WEBSOCKET_REQUEST_PARAMS));
    };

    const map = new Map<string, DomesticTicker>();

    const updateTicker = () => {
      [...map.entries()].forEach(([symbol, ticker]) => {
        setTicker(symbol, ticker);
        map.clear();
      });
    };

    const intervalId = setInterval(updateTicker, 500);

    socket.onmessage = async (event: MessageEvent<Blob>) => {
      const ticker = await convertTicker(event);
      if (ticker.symbol === 'BTC') {
        btcPriceRef.current = ticker.currentPrice;
      }

      if (isKRWMarket) {
        map.set(ticker.symbol, ticker);
        return;
      }

      if (ticker.symbol !== 'BTC') {
        const currentPrice = ticker.currentPrice * btcPriceRef.current;
        map.set(ticker.symbol, {
          ...ticker,
          currentPrice,
          transactionAmount: ticker.transactionAmount * btcPriceRef.current,
        });
      }
    };

    socket.onclose = () => {
      setTickerList(new Map());
    };

    return () => {
      clearInterval(intervalId);
      socket.close();
    };
  }, [setTicker, symbolList, domesticExchange, setTickerList, isKRWMarket]);
};
