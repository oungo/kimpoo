import { useBinanceTickers } from '@/hooks/useBinanceTickers';
import { useBithumbTickers } from '@/hooks/useBithumbTickers';
import { useSortedTickerList } from '@/hooks/useSortedTickerList';
import { useUpbitMarketListQuery } from '@/hooks/useUpbitMarketListQuery';
import { useUpbitTickers } from '@/hooks/useUpbitTickers';
import TickerItem from './TickerItem';

const TableTickerBody = () => {
  const tickerList = useSortedTickerList();

  const { data: upbitMarketList } = useUpbitMarketListQuery();

  useUpbitTickers();
  useBithumbTickers();
  useBinanceTickers();

  return (
    <tbody>
      {tickerList.map((ticker) => (
        <TickerItem
          key={ticker.symbol}
          ticker={ticker}
          koreanSymbol={
            upbitMarketList?.find(({ market }) => market === ticker.symbol)?.korean_name
          }
        />
      ))}
    </tbody>
  );
};

export default TableTickerBody;
