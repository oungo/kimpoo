'use client';

import { shallow } from 'zustand/shallow';
import type { SortType } from '@/store/use-ticker-store';
import { useTickerStore } from '@/store/use-ticker-store';

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

  return { sortOption, sortTicker };
};
