import type { SortType } from '@/store/useTickerStore';
import { useTickerStore } from '@/store/useTickerStore';
import { shallow } from 'zustand/shallow';

export const useSortTicker = () => {
  const { sortOption, setSortOption } = useTickerStore(
    (state) => ({
      sortOption: state.sortOption,
      setSortOption: state.setSortOption,
    }),
    shallow
  );

  const sortTicker = (type: SortType) => {
    setSortOption({ type, desc: type === sortOption.type ? !sortOption.desc : sortOption.desc });
  };

  return { sortTicker };
};
