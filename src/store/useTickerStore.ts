import {
  Coins,
  DomesticExchangeList,
  DomesticTicker,
  OverseasTicker,
  Ticker,
} from '@/components/ticker/types';
import { create } from 'zustand';

interface TickerState {
  tickerList: Map<Ticker['symbol'], Ticker>;
  setTicker: (symbol: string, ticker: DomesticTicker | OverseasTicker) => void;
  setTickerList: (tickerList?: Map<Ticker['symbol'], DomesticTicker | OverseasTicker>) => void;
  domesticExchange: DomesticExchangeList;
  setDomesticExchange: (exchange: DomesticExchangeList) => void;
  loadingSocketChange: boolean;
  setLoadingSocketChange: (loading: boolean) => void;
  coinList: Map<string, Coins>;
  setCoinList: (coinList: Map<string, Coins>) => void;
}

export const useTickerStore = create<TickerState>()((set) => ({
  tickerList: new Map(),
  setTicker: (symbol, ticker) => {
    set(({ tickerList }) => ({
      tickerList: new Map(tickerList).set(symbol, { ...tickerList.get(symbol), ...ticker }),
    }));
  },
  setTickerList: (tickerList) => set({ tickerList: new Map(tickerList) || new Map() }),
  domesticExchange: DomesticExchangeList.UPBIT,
  setDomesticExchange: (exchange) => set({ domesticExchange: exchange }),
  loadingSocketChange: false,
  setLoadingSocketChange: (loading: boolean) => set({ loadingSocketChange: loading }),
  coinList: new Map(),
  setCoinList: (coinList: Map<string, Coins>) => set({ coinList }),
}));
