import {
  DomesticExchangeList,
  DomesticTicker,
  OverseasTicker,
  Ticker,
} from '@/components/ticker/types';
import { create } from 'zustand';

interface TickerState {
  tickerList: Map<Ticker['symbol'], Ticker>;
  setTickerList: (symbol: string, tickerList: DomesticTicker | OverseasTicker) => void;
  domesticExchange: DomesticExchangeList;
  setDomesticExchange: (exchange: DomesticExchangeList) => void;
}

export const useTickerStore = create<TickerState>()((set) => ({
  tickerList: new Map(),
  setTickerList: (symbol, ticker) => {
    set(({ tickerList }) => ({
      tickerList: new Map(tickerList).set(symbol, { ...tickerList.get(symbol), ...ticker }),
    }));
  },
  domesticExchange: DomesticExchangeList.UPBIT,
  setDomesticExchange: (exchange) => set({ domesticExchange: exchange }),
}));
