import { useMemo } from 'react';
import { useBinanceTickers } from '@/hooks/use-binance-tickers';
import { useBithumbMarketQuery } from '@/hooks/use-bithumb-market-query';
import { useBithumbTickers } from '@/hooks/use-bithumb-tickers';
import { useTickerList } from '@/hooks/use-ticker-list';
import { useUpbitMarketQuery } from '@/hooks/use-upbit-market-query';
import { useUpbitTickers } from '@/hooks/use-upbit-tickers';
import coinsData from '@/public/json/coins.json';
import { useTickerStore } from '@/store/use-ticker-store';
import { createUpbitSymbolIconUrl } from '@/utils/common';
import TableRow from './table-row';
import Loading from 'app/(ticker)/loading';

const TableBody = () => {
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
        <TableRow
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

export default TableBody;
