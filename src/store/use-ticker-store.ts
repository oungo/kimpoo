import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { DomesticTicker, OverseasTicker, Ticker } from '@/components/ticker/types';
import type { OverseasExchange } from '@/components/ticker/types';
import type { DomesticExchange } from '@/components/ticker/types';

export type SortType = keyof Pick<Ticker, 'symbol' | 'currentPrice' | 'premium' | 'changeRate' | 'transactionAmount'>;

interface SortOption {
  type: SortType;
  desc: boolean;
}

interface State {
  tickerMap?: Map<Ticker['symbol'], Ticker>;
  domesticExchange: DomesticExchange;
  overseasExchange: OverseasExchange;
  sortOption: SortOption;
  searchWord: string;
  favoriteSymbols: string[];
}

interface Action {
  setTicker: (symbol: string, ticker: DomesticTicker | OverseasTicker) => void;
  setTickerMap: (tickerList?: Map<Ticker['symbol'], Ticker>) => void;
  setDomesticExchange: (exchange: DomesticExchange) => void;
  setOverseasExchange: (exchange: OverseasExchange) => void;
  setSortOption: (option: SortOption) => void;
  setSearchWord: (searchKeyword: string) => void;
  setFavoriteSymbols: (favoriteSymbols: string[]) => void;
}

type Store = State & Action;

const initalState: State = {
  domesticExchange: 'UPBIT_KRW',
  overseasExchange: 'BINANCE_USDT',
  sortOption: { type: 'premium', desc: true },
  searchWord: '',
  favoriteSymbols: [],
};

export const useTickerStore = create<Store>()(
  devtools((set) => ({
    ...initalState,
    setTicker: (symbol, ticker) => {
      set(({ tickerMap }) => {
        const tickerItem = tickerMap?.get(symbol);
        if (!tickerItem) {
          return { tickerMap: new Map(tickerMap).set(symbol, ticker as Ticker) };
        }

        let premium;
        if (tickerItem.oCurrentPrice && tickerItem.currentPrice) {
          premium = tickerItem.currentPrice / tickerItem.oCurrentPrice - 1;
        }

        const newTickerData = {
          ...tickerItem,
          ...ticker,
          premium,
        };

        return { tickerMap: new Map(tickerMap).set(symbol, newTickerData) };
      });
    },
    setTickerMap: (tickerMap) => set({ tickerMap }),
    setDomesticExchange: (exchange) => set({ domesticExchange: exchange }),
    setOverseasExchange: (exchange) => set({ overseasExchange: exchange }),
    setSortOption: (sortOption) => set({ sortOption }),
    setSearchWord: (searchKeyword) => set({ searchWord: searchKeyword }),
    setFavoriteSymbols: (favoriteSymbols) => set({ favoriteSymbols }),
  }))
);
