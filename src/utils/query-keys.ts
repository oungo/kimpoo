import type { DomesticExchange } from '@/components/ticker/types';

export const tickerKeys = {
  upbitMarket: (domesticExchange: DomesticExchange) => ['upbitMarket', domesticExchange] as const,
  bithumbMarket: ['bithumbMarket'],
  bithumbMarketPrice: ['bithumbMarketPrice'],
  quotation: ['quotation'],
};
