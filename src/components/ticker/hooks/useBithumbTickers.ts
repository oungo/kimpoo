import { TICKER_LIST } from 'constants/constants';
import { useEffect } from 'react';
import { useTickerStore } from 'store/useTickerStore';
import { DomesticExchangeList } from '../types';

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

const WEBSOCKET_REQUEST_PARAMS = {
  type: 'ticker',
  symbols: TICKER_LIST.map((ticker) => `${ticker}_KRW`),
  tickTypes: ['24H'],
};

export const useBithumbTickers = (domesticExchange: DomesticExchangeList) => {
  const setTicker = useTickerStore((state) => state.setTickerList);
  const initializeTickerList = useTickerStore((state) => state.initializeTickerList);
  const setLoadingSocketChange = useTickerStore((state) => state.setLoadingSocketChange);

  useEffect(() => {
    if (domesticExchange !== DomesticExchangeList.BITHUMB) return;

    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      setLoadingSocketChange(false);
      socket.send(JSON.stringify(WEBSOCKET_REQUEST_PARAMS));
    };

    socket.onmessage = async (event: MessageEvent<string>) => {
      const data: SocketStatusResponse | BithumbTicker = JSON.parse(event.data);

      if ('status' in data) return;

      const { symbol, closePrice, value, prevClosePrice } = data.content;
      const newSymbol = symbol.replace('_KRW', '');
      const newData = {
        symbol: newSymbol,
        currentPrice: Number(closePrice),
        changeRate: (Number(closePrice) / Number(prevClosePrice)) * 100 - 100,
        transactionAmount: Number(value),
      };

      setTicker(newSymbol, newData);
    };

    return () => {
      setLoadingSocketChange(true);
      initializeTickerList();
      socket.close();
    };
  }, [setTicker, domesticExchange, setLoadingSocketChange, initializeTickerList]);
};
