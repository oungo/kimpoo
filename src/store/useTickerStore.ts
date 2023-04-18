import type { Coin, DomesticTicker, OverseasTicker, Ticker } from '@/components/ticker/types';
import type { OverseasExchange } from '@/components/ticker/types';
import type { DomesticExchange } from '@/components/ticker/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type SortType = keyof Pick<
  Ticker,
  'symbol' | 'currentPrice' | 'premium' | 'changeRate' | 'transactionAmount'
>;

interface SortOption {
  type: SortType;
  desc: boolean;
}

interface TickerState {
  tickerMap: Map<Ticker['symbol'], Ticker>;
  setTicker: (symbol: string, ticker: DomesticTicker | OverseasTicker) => void;
  setTickerMap: (tickerList?: Map<Ticker['symbol'], Ticker>) => void;
  domesticExchange: DomesticExchange;
  setDomesticExchange: (exchange: DomesticExchange) => void;
  overseasExchange: OverseasExchange;
  setOverseasExchange: (exchange: OverseasExchange) => void;
  coinList: Map<string, Coin>;
  setCoinList: (coinList: Map<string, Coin>) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  symbolList: string[];
  setSymbolList: (symbolList: string[]) => void;
}

export const useTickerStore = create<TickerState>()(
  devtools((set) => ({
    tickerMap: new Map(),
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
        'setTicker'
      );
    },
    setTickerMap: (tickerMap) => set({ tickerMap }, false, 'setTickerMap'),
    domesticExchange: 'UPBIT_KRW',
    setDomesticExchange: (exchange) =>
      set({ domesticExchange: exchange }, false, 'setDomesticExchange'),
    overseasExchange: 'BINANCE_USDT',
    setOverseasExchange: (exchange) =>
      set({ overseasExchange: exchange }, false, 'setOverseasExchange'),
    coinList: new Map(),
    setCoinList: (coinList: Map<string, Coin>) => set({ coinList }, false, 'setCoinList'),
    sortOption: { type: 'premium', desc: true },
    setSortOption: (sortOption: SortOption) => set({ sortOption }, false, 'setSortOption'),
    symbolList: [],
    setSymbolList: (symbolList: string[]) => set({ symbolList }, false, 'setSymbolList'),
  }))
);
