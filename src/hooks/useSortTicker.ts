'use client';

import { shallow } from 'zustand/shallow';
import type { SortType } from '@/store/useTickerStore';
import { useTickerStore } from '@/store/useTickerStore';

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
