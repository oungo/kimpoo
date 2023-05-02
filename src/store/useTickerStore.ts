import type { Coin, DomesticTicker, OverseasTicker, Ticker } from '@/components/ticker/types';
import type { OverseasExchange } from '@/components/ticker/types';
import type { DomesticExchange } from '@/components/ticker/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type SortType = keyof Pick<Ticker, 'symbol' | 'currentPrice' | 'premium' | 'changeRate' | 'transactionAmount'>;

interface SortOption {
  type: SortType;
  desc: boolean;
}

interface State {
  tickerMap: Map<Ticker['symbol'], Ticker>;
  domesticExchange: DomesticExchange;
  overseasExchange: OverseasExchange;
  coinList: Map<string, Coin>;
  sortOption: SortOption;
}

interface Action {
  setTicker: (symbol: string, ticker: DomesticTicker | OverseasTicker) => void;
  setTickerMap: (tickerList?: Map<Ticker['symbol'], Ticker>) => void;
  setDomesticExchange: (exchange: DomesticExchange) => void;
  setOverseasExchange: (exchange: OverseasExchange) => void;
  setCoinList: (coinList: Map<string, Coin>) => void;
  setSortOption: (option: SortOption) => void;
}

type Store = State & Action;

const initalState: State = {
  tickerMap: new Map(),
  domesticExchange: 'UPBIT_KRW',
  overseasExchange: 'BINANCE_USDT',
  coinList: new Map(),
  sortOption: { type: 'premium', desc: true },
};

export const useTickerStore = create<Store>()(
  devtools((set) => ({
    ...initalState,
    setTicker: (symbol, ticker) => {
      set(
        ({ tickerMap }) => {
          const tickerItem = tickerMap.get(symbol);
          if (!tickerItem) {
            return { tickerMap: new Map(tickerMap).set(symbol, ticker as DomesticTicker) };
          }

          let premium;
          if (tickerItem?.oCurrentPrice && tickerItem.currentPrice) {
            premium = tickerItem.currentPrice / tickerItem.oCurrentPrice - 1;
          }

          const newTickerData = {
            ...tickerItem,
            ...ticker,
            premium,
          };

          return { tickerMap: new Map(tickerMap).set(symbol, newTickerData) };
        },
        false,
        { type: 'setTicker', symbol }
      );
    },
    setTickerMap: (tickerMap) => set({ tickerMap }, false, 'setTickerMap'),
    setDomesticExchange: (exchange) => set({ domesticExchange: exchange }, false, 'setDomesticExchange'),
    setOverseasExchange: (exchange) => set({ overseasExchange: exchange }, false, 'setOverseasExchange'),
    setCoinList: (coinList: Map<string, Coin>) => set({ coinList }, false, 'setCoinList'),
    setSortOption: (sortOption: SortOption) => set({ sortOption }, false, 'setSortOption'),
  }))
);
