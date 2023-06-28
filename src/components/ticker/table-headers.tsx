'use client';

import { useSortTicker } from '@/hooks/use-sort-ticker';
import TableHeader from './table-header';

const TableHeaders = () => {
  const { sortTicker } = useSortTicker();

  return (
    <>
      <TableHeader onSort={() => sortTicker('symbol')} sortType="symbol">
        이름
      </TableHeader>
      <TableHeader onSort={() => sortTicker('currentPrice')} sortType="currentPrice">
        현재가
      </TableHeader>
      <TableHeader onSort={() => sortTicker('premium')} sortType="premium">
        김프
      </TableHeader>
      <TableHeader onSort={() => sortTicker('changeRate')} sortType="changeRate">
        전일 대비
      </TableHeader>
      <TableHeader onSort={() => sortTicker('transactionAmount')} sortType="transactionAmount">
        거래액(일)
      </TableHeader>
    </>
  );
};

export default TableHeaders;
