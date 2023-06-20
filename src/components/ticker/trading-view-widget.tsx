import React, { memo, useEffect } from 'react';
import { useTickerStore } from '@/store/use-ticker-store';
import type { DomesticExchange } from './types';

interface Props {
  symbol: string;
}

const getChartSymbol = (domesticExchange: DomesticExchange, symbol: string) => {
  switch (domesticExchange) {
    case 'UPBIT_KRW':
      return `UPBIT:${symbol}KRW`;
    case 'UPBIT_BTC':
      return `UPBIT:${symbol}BTC`;
    case 'BITHUMB':
      return `BITHUMB:${symbol}KRW`;
  }
};

const createWidget = (symbol: string, domesticExchange: DomesticExchange, darkMode: boolean) => {
  new window.TradingView.widget({
    autosize: true,
    symbol: getChartSymbol(domesticExchange, symbol),
    timezone: 'Asia/Seoul',
    theme: darkMode ? 'dark' : 'light',
    style: '1',
    interval: '30',
    locale: 'kr',
    enable_publishing: false,
    allow_symbol_change: true,
    container_id: `tradingview${symbol}`,
    save_image: false,
  });
};

const TradingViewWidget = ({ symbol }: Props) => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  useEffect(() => {
    const darkMode = localStorage.getItem('theme') !== 'light';
    if (document.getElementById(`tradingview${symbol}`) && 'TradingView' in window) {
      createWidget(symbol, domesticExchange, darkMode);
    }

    const callback: MutationCallback = (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const html = mutation.target as HTMLElement;
          const darkMode = html.classList.contains('dark');
          createWidget(symbol, domesticExchange, darkMode);
        }
      });
    };

    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, {
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [symbol, domesticExchange]);

  return <div id={`tradingview${symbol}`} className="h-full" />;
};

export default memo(TradingViewWidget);
