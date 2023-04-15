import type { Coin, DomesticTicker, OverseasTicker, Ticker } from '@/components/ticker/types';
import { OverseasExchange } from '@/components/ticker/types';
import { DomesticExchange } from '@/components/ticker/types';
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
  tickerList: Map<Ticker['symbol'], Ticker>;
  setTicker: (symbol: string, ticker: DomesticTicker | OverseasTicker) => void;
  setTickerList: (tickerList?: Map<Ticker['symbol'], Ticker>) => void;
  domesticExchange: DomesticExchange;
  setDomesticExchange: (exchange: DomesticExchange) => void;
  overseasExchange: OverseasExchange;
  setOverseasExchange: (exchange: OverseasExchange) => void;
  coinList: Map<string, Coin>;
  setCoinList: (coinList: Map<string, Coin>) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

export const useTickerStore = create<TickerState>()(
  devtools((set) => ({
    tickerList: new Map(),
    setTicker: (symbol, ticker) => {
      set(
        ({ tickerList }) => {
          const tickerItem = tickerList.get(symbol);
          if (!tickerItem) {
            return { tickerList: new Map(tickerList).set(symbol, ticker as DomesticTicker) };
          }

          let premium;
          if (tickerItem?.oCurrentPrice && tickerItem.currentPrice) {
            premium = parseFloat(
              ((tickerItem.currentPrice / tickerItem.oCurrentPrice - 1) * 100).toFixed(2)
            );
          }

          const newTickerData = {
            ...tickerItem,
            ...ticker,
            premium,
          };

          return { tickerList: new Map(tickerList).set(symbol, newTickerData) };
        },
        false,
        'setTicker'
      );
    },
    setTickerList: (tickerList) => set({ tickerList }, false, 'setTickerList'),
    domesticExchange: DomesticExchange.UPBIT_KRW,
    setDomesticExchange: (exchange) =>
      set({ domesticExchange: exchange }, false, 'setDomesticExchange'),
    overseasExchange: OverseasExchange.BINANCE_USDT,
    setOverseasExchange: (exchange) =>
      set({ overseasExchange: exchange }, false, 'setOverseasExchange'),
    coinList: new Map(),
    setCoinList: (coinList: Map<string, Coin>) => set({ coinList }, false, 'setCoinList'),
    sortOption: { type: 'premium', desc: true },
    setSortOption: (sortOption: SortOption) => set({ sortOption }, false, 'setSortOption'),
  }))
);
