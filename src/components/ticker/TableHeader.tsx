import { useSortTicker } from '@/hooks/useSortTicker';
import type { SortType } from '@/store/useTickerStore';
import type { ReactNode } from 'react';

interface Props {
  sortType: SortType;
  children: ReactNode;
  onSort: () => void;
}

const TableHeader = ({ sortType, onSort, children }: Props) => {
  const { sortOption } = useSortTicker();

  return (
    <th
      onClick={onSort}
      className={`py-2 cursor-pointer ${sortType === 'symbol' ? 'text-left' : 'text-right'} ${
        sortOption.type === sortType ? '!text-black dark:!text-white' : 'text-neutral-400 dark:text-neutral-400'
      }`}
    >
      {children}
      <span className="ml-1 text-[10px] relative">
        <i
          className={`absolute -top-[2px] fa-solid fa-caret-up ${
            sortOption.type === sortType && !sortOption.desc
              ? 'text-black dark:text-white'
              : 'text-neutral-400 dark:text-neutral-400'
          }`}
        />
        <i
          className={`absolute -bottom-[2px] fa-solid fa-caret-down ${
            sortOption.type === sortType && sortOption.desc
              ? 'text-black dark:text-white'
              : 'text-neutral-400 dark:text-neutral-400'
          } `}
        />
      </span>
    </th>
  );
};

export default TableHeader;
