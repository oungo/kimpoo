import { useBinanceTickers } from '@/hooks/useBinanceTickers';
import { useBithumbTickers } from '@/hooks/useBithumbTickers';
import { useSortedTickerList } from '@/hooks/useSortedTickerList';
import { useUpbitMarketQuery } from '@/hooks/useUpbitMarketQuery';
import { useUpbitTickers } from '@/hooks/useUpbitTickers';
import TickerItem from './TickerItem';

const TableTickerBody = () => {
  const tickerList = useSortedTickerList();

  const { data: upbitMarket } = useUpbitMarketQuery();
  useUpbitTickers();
  useBithumbTickers();
  useBinanceTickers();

  return (
    <tbody>
      {tickerList.map((ticker) => (
        <TickerItem
          key={ticker.symbol}
          ticker={ticker}
          koreanSymbol={upbitMarket?.find(({ market }) => market === ticker.symbol)?.korean_name}
        />
      ))}
    </tbody>
  );
};

export default TableTickerBody;
