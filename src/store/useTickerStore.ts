import type { Coin, DomesticTicker, OverseasTicker, Ticker } from '@/components/ticker/types';
import { OverseasExchange } from '@/components/ticker/types';
import { DomesticExchange } from '@/components/ticker/types';
import { formatPrice } from '@/utils/common';
import { create } from 'zustand';

interface TickerState {
  tickerList: Map<Ticker['symbol'], Ticker>;
  setTicker: (symbol: string, ticker: DomesticTicker | OverseasTicker) => void;
  setTickerList: (tickerList?: Map<Ticker['symbol'], DomesticTicker | OverseasTicker>) => void;
  domesticExchange: DomesticExchange;
  setDomesticExchange: (exchange: DomesticExchange) => void;
  overseasExchange: OverseasExchange;
  setOverseasExchange: (exchange: OverseasExchange) => void;
  coinList: Map<string, Coin>;
  setCoinList: (coinList: Map<string, Coin>) => void;
}

export const useTickerStore = create<TickerState>()((set) => ({
  tickerList: new Map(),
  setTicker: (symbol, ticker) => {
    set(({ tickerList }) => {
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
    });
  },
  setTickerList: (tickerList) => set({ tickerList: new Map(tickerList) || new Map() }),
  domesticExchange: DomesticExchange.UPBIT_KRW,
  setDomesticExchange: (exchange) => set({ domesticExchange: exchange }),
  overseasExchange: OverseasExchange.BINANCE_USDT,
  setOverseasExchange: (exchange) => set({ overseasExchange: exchange }),
  coinList: new Map(),
  setCoinList: (coinList: Map<string, Coin>) => set({ coinList }),
}));
