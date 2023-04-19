import { useBinanceTickers } from '@/hooks/useBinanceTickers';
import { useBithumbTickers } from '@/hooks/useBithumbTickers';
import { useSortedTickerList } from '@/hooks/useSortedTickerList';
import { useUpbitMarketQuery } from '@/hooks/useUpbitMarketQuery';
import { useUpbitTickers } from '@/hooks/useUpbitTickers';
import { useTickerStore } from '@/store/useTickerStore';
import TickerItem from './TickerItem';

const TableTickerBody = () => {
  const coinList = useTickerStore((state) => state.coinList);
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

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
          thumb={
            domesticExchange.startsWith('UPBIT')
              ? `https://static.upbit.com/logos/${ticker.symbol}.png`
              : coinList.get(ticker.symbol)?.thumb
          }
          symbolName={
            upbitMarket?.find(({ market }) => market === ticker.symbol)?.korean_name ||
            coinList.get(ticker.symbol)?.name
          }
        />
      ))}
    </tbody>
  );
};

export default TableTickerBody;
