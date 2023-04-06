import type { SortType } from '@/store/useTickerStore';
import { useTickerStore } from '@/store/useTickerStore';
import TableTickerBody from './TableTickerBody';
import { shallow } from 'zustand/shallow';

const TableTicker = () => {
  const { sortOption, setSortOption } = useTickerStore(
    (state) => ({
      sortOption: state.sortOption,
      setSortOption: state.setSortOption,
    }),
    shallow
  );

  const handleSortClick = (type: SortType) => {
    setSortOption({ type, desc: type === sortOption.type ? !sortOption.desc : sortOption.desc });
  };

  return (
    <table className="w-full max-w-screen-lg mt-4 text-xs table-fixed sm:text-sm">
      <colgroup>
        <col width="30%" />
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr className="text-right border-b border-b-gray-500 dark:border-b-neutral-700">
          <th onClick={() => handleSortClick('symbol')} className="text-left">
            이름
          </th>
          <th onClick={() => handleSortClick('currentPrice')}>현재가</th>
          <th onClick={() => handleSortClick('premium')}>김프</th>
          <th onClick={() => handleSortClick('changeRate')}>전일 대비</th>
          <th onClick={() => handleSortClick('transactionAmount')}>거래액(일)</th>
        </tr>
      </thead>
      <TableTickerBody />
    </table>
  );
};

export default TableTicker;
