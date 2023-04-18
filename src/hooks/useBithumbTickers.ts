import type { DomesticTicker } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { useBithumbMarketQuery as useBithumbMarketQuery } from './useBithumbMarketQuery';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

interface SocketStatusResponse {
  status: '0000' | '5100';
  resmsg: string;
}

interface BithumbTicker {
  type: 'ticker';
  content: {
    /** 통화코드 */
    symbol: string; // 통화코드
    /** 변동 기준시간- 30M, 1H, 12H, 24H, MID */
    tickType: string;
    /** 일자 */
    date: string;
    /** 시간 */
    time: string;
    /** 시가 */
    openPrice: string;
    /** 종가 */
    closePrice: string;
    /** 저가 */
    lowPrice: string;
    /** 고가 */
    highPrice: string;
    /** 누적거래금액 */
    value: string;
    /** 누적거래량 */
    volume: string;
    /** 매도누적거래량 */
    sellVolume: string;
    /** 매수누적거래량 */
    buyVolume: string;
    /** 전일종가 */
    prevClosePrice: string;
    /** 변동률 */
    chgRate: string;
    /** 변동금액 */
    chgAmt: string;
    /** 체결강도 */
    volumePower: string;
  };
}

const WEBSOCKET_URL = 'wss://pubwss.bithumb.com/pub/ws';

export const useBithumbTickers = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const symbolList = useTickerStore((state) => state.symbolList);
  const { setTicker, setTickerMap } = useTickerStore(
    (state) => ({
      setTicker: state.setTicker,
      setTickerMap: state.setTickerMap,
    }),
    shallow
  );

  useEffect(() => {
    if (domesticExchange !== 'BITHUMB') return;

    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      const WEBSOCKET_REQUEST_PARAMS = {
        type: 'ticker',
        symbols: symbolList.map((ticker) => `${ticker}_KRW`),
        tickTypes: ['24H'],
      };

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

    socket.onmessage = async (event: MessageEvent<string>) => {
      const data: SocketStatusResponse | BithumbTicker = JSON.parse(event.data);

      if ('status' in data) return;

      const { symbol, closePrice, value, prevClosePrice } = data.content;
      const newSymbol = symbol.replace('_KRW', '');
      const newData: DomesticTicker = {
        symbol: newSymbol,
        currentPrice: parseFloat(closePrice),
        changeRate: parseFloat(closePrice) / parseFloat(prevClosePrice) - 1,
        transactionAmount: parseFloat(value),
      };

      map.set(newSymbol, newData);
    };

    socket.close = () => {
      setTickerMap(new Map());
    };

    return () => {
      clearInterval(intervalId);
      socket.close();
    };
  }, [setTicker, symbolList, domesticExchange, setTickerMap]);

  const { data: bithumbMarket } = useBithumbMarketQuery();
  useEffect(() => {
    if (domesticExchange !== 'BITHUMB' || !bithumbMarket?.data) return;

    const bithumbTickerMap: Map<string, DomesticTicker> = new Map();

    for (const market of bithumbMarket?.data) {
      const ticker: DomesticTicker = {
        symbol: market.symbol,
        currentPrice: market.closing_price,
        changeRate: market.closing_price / market.prev_closing_price - 1,
        transactionAmount: market.acc_trade_value_24H,
      };
      bithumbTickerMap.set(market.symbol, ticker);
    }

    setTickerMap(new Map(bithumbTickerMap));
  }, [bithumbMarket, domesticExchange, setTickerMap]);
};
