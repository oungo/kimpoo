import { useMemo } from 'react';
import { useBinanceTickers } from '@/hooks/useBinanceTickers';
import { useBithumbMarketQuery } from '@/hooks/useBithumbMarketQuery';
import { useBithumbTickers } from '@/hooks/useBithumbTickers';
import { useTickerList } from '@/hooks/useTickerList';
import { useUpbitMarketQuery } from '@/hooks/useUpbitMarketQuery';
import { useUpbitTickers } from '@/hooks/useUpbitTickers';
import coinsData from '@/public/json/coins.json';
import { useTickerStore } from '@/store/useTickerStore';
import { createUpbitSymbolIconUrl } from '@/utils/common';
import TickerItem from './TickerItem';
import Loading from 'app/(ticker)/loading';

const TableTickerBody = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const isBithumb = domesticExchange === 'BITHUMB';
  const tickerList = useTickerList();

  const { data: upbitMarket } = useUpbitMarketQuery();
  const { data: bithumbMarket } = useBithumbMarketQuery();

  const symbolList = useMemo(() => {
    return isBithumb ? bithumbMarket?.map(({ coinSymbol }) => coinSymbol) : upbitMarket?.map(({ market }) => market);
  }, [upbitMarket, bithumbMarket, isBithumb]);

  useUpbitTickers(symbolList);
  useBithumbTickers(symbolList);
  useBinanceTickers(symbolList);

  if (!tickerList) return <Loading />;
  if (tickerList.length < 1) return <Empty />;

  return (
    <tbody>
      {tickerList.map((ticker, index) => (
        <TickerItem
          key={ticker.symbol}
          ticker={ticker}
          priority={index < 10}
          thumb={
            isBithumb
              ? coinsData.coins.find((coin) => coin.symbol === ticker.symbol)?.thumb
              : createUpbitSymbolIconUrl(ticker.symbol)
          }
        />
      ))}
    </tbody>
  );
};

const Empty = () => (
  <tbody>
    <tr className="relative">
      <td className="absolute mt-5 text-center -translate-x-1/2 left-1/2">암호화폐를 찾을 수 없습니다.</td>
    </tr>
  </tbody>
);

export default TableTickerBody;
