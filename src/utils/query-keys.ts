import type { DomesticExchange } from '@/components/ticker/types';

export const tickerKeys = {
  upbitMarket: (domesticExchange: DomesticExchange) => ['upbitMarket', domesticExchange] as const,
  bithumbMarket: ['bithumbMarket'] as const,
  bithumbMarketPrice: ['bithumbMarketPrice'] as const,
  quotation: ['quotation'] as const,
};
