import type { Coin, DomesticTicker, OverseasTicker, Ticker } from '@/components/ticker/types';
import { OverseasExchange } from '@/components/ticker/types';
import { DomesticExchange } from '@/components/ticker/types';
import { formatPrice } from '@/utils/common';
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
  setTickerList: (tickerList?: Map<Ticker['symbol'], DomesticTicker | OverseasTicker>) => void;
  sortTickerList: (sortType: SortType, desc: boolean) => void;
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
  devtools((set, get) => ({
    tickerList: new Map(),
    setTicker: (symbol, ticker) => {
      set(
        ({ tickerList }) => {
          const tickerData = tickerList.get(symbol);
          const premium = formatPrice(
            (tickerData?.currentPrice / tickerData?.oCurrentPrice - 1) * 100,
            {
              signDisplay: 'exceptZero',
              maximumFractionDigits: 2,
            }
          );

          return {
            tickerList: new Map(tickerList).set(symbol, {
              ...tickerList.get(symbol),
              ...ticker,
              premium,
            }),
          };
        },
        false,
        'setTicker'
      );
    },
    setTickerList: (tickerList) =>
      set({ tickerList: new Map(tickerList) || new Map() }, false, 'setTickerList'),
    sortTickerList: (sortType, desc) => {
      const tickerList = [...get().tickerList.entries()];

      switch (sortType) {
        case 'symbol':
          tickerList.sort((a, b) => {
            if (desc) {
              return a[1][sortType] > b[1][sortType] ? -1 : b[1][sortType] < a[1][sortType] ? 1 : 0;
            }
            return a[1][sortType] < b[1][sortType] ? -1 : b[1][sortType] > a[1][sortType] ? 1 : 0;
          });
          break;
        case 'currentPrice':
          tickerList.sort((a, b) => {
            if (desc) return b[1][sortType] - a[1][sortType];
            return a[1][sortType] - b[1][sortType];
          });
          break;
      }

      set({ tickerList: new Map(tickerList) }, false, 'sortTickerList');
    },
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
