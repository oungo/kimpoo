import type { DomesticTicker } from '@/components/ticker/types';
import { DomesticExchange } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { formatPrice } from '@/utils/common';
import { useEffect } from 'react';

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

export const useBithumbTickers = (domesticExchange: DomesticExchange, symbolList: string[]) => {
  const setTicker = useTickerStore((state) => state.setTicker);
  const setTickerList = useTickerStore((state) => state.setTickerList);

  useEffect(() => {
    if (domesticExchange !== DomesticExchange.BITHUMB) return;

    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      const WEBSOCKET_REQUEST_PARAMS = {
        type: 'ticker',
        symbols: symbolList.map((ticker) => `${ticker}_KRW`),
        tickTypes: ['24H'],
      };

      socket.send(JSON.stringify(WEBSOCKET_REQUEST_PARAMS));
    };

    socket.onmessage = async (event: MessageEvent<string>) => {
      const data: SocketStatusResponse | BithumbTicker = JSON.parse(event.data);

      if ('status' in data) return;

      const { symbol, closePrice, value, prevClosePrice } = data.content;
      const newSymbol = symbol.replace('_KRW', '');
      const newData: DomesticTicker = {
        symbol: newSymbol,
        currentPrice: parseFloat(closePrice),
        formattedCurrentPrice:
          parseFloat(closePrice) < 1
            ? closePrice
            : formatPrice(closePrice, {
                maximumFractionDigits: parseFloat(closePrice) < 100 ? 2 : 0,
              }),
        changeRate: formatPrice(
          ((parseFloat(closePrice) / parseFloat(prevClosePrice) - 1) * 100).toFixed(2),
          { signDisplay: 'exceptZero' }
        ),
        transactionAmount: parseFloat(value),
        formattedTransactionAmount: formatPrice(value, { notation: 'compact' }),
      };

      setTicker(newSymbol, newData);
    };

    return () => {
      socket.close();
    };
  }, [setTicker, symbolList, domesticExchange, setTickerList]);
};
