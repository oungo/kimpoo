import { useSortTicker } from '@/hooks/useSortTicker';
import type { SortType } from '@/store/useTickerStore';
import TableHeader from './TableHeader';
import TableTickerBody from './TableTickerBody';

const TableTicker = () => {
  const { sortTicker } = useSortTicker();

  const handleSortClick = (type: SortType) => {
    sortTicker(type);
  };

  return (
    <table className="w-full max-w-screen-lg mt-4 text-xs table-fixed sm:text-sm">
      <colgroup>
        <col width="30%" />
        <col />
        <col />
        <col />
        <col width="20%" />
      </colgroup>
      <thead className="text-xs">
        <tr className="text-right border-b border-b-gray-500 dark:border-b-neutral-700 [&>th]:text-neutral-500">
          <TableHeader onSort={() => handleSortClick('symbol')} sortType="symbol">
            이름
          </TableHeader>
          <TableHeader onSort={() => handleSortClick('currentPrice')} sortType="currentPrice">
            현재가
          </TableHeader>
          <TableHeader onSort={() => handleSortClick('premium')} sortType="premium">
            김프
          </TableHeader>
          <TableHeader onSort={() => handleSortClick('changeRate')} sortType="changeRate">
            전일 대비
          </TableHeader>
          <TableHeader
            onSort={() => handleSortClick('transactionAmount')}
            sortType="transactionAmount"
          >
            거래액(일)
          </TableHeader>
        </tr>
      </thead>
      <TableTickerBody />
    </table>
  );
};

export default TableTicker;
