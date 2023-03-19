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
  resetTickerList: () => void;
  domesticExchange: DomesticExchangeList;
  setDomesticExchange: (exchange: DomesticExchangeList) => void;
  loadingSocketChange: boolean;
  setLoadingSocketChange: (loading: boolean) => void;
}

export const useTickerStore = create<TickerState>()((set) => ({
  tickerList: new Map(),
  setTickerList: (symbol, ticker) => {
    set(({ tickerList }) => ({
      tickerList: new Map(tickerList).set(symbol, { ...tickerList.get(symbol), ...ticker }),
    }));
  },
  resetTickerList: () => set({ tickerList: new Map() }),
  domesticExchange: DomesticExchangeList.UPBIT,
  setDomesticExchange: (exchange) => set({ domesticExchange: exchange }),
  loadingSocketChange: false,
  setLoadingSocketChange: (loading: boolean) => set({ loadingSocketChange: loading }),
}));
