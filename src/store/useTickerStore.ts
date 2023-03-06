import { Ticker } from '@/components/ticker/types';
import { create } from 'zustand';

interface TickerState {
  tickerList: Map<Ticker['cd'], Ticker>;
  setTickerList: (code: string, tickerList: Ticker) => void;
}

export const useTickerStore = create<TickerState>()((set) => ({
  tickerList: new Map(),
  setTickerList: (code, ticker) => {
    set(({ tickerList }) => ({
      tickerList: new Map(tickerList).set(code, { ...tickerList.get(code), ...ticker }),
    }));
  },
}));
