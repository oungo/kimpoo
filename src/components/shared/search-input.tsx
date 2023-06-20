'use client';

import { shallow } from 'zustand/shallow';
import { useTickerStore } from '@/store/use-ticker-store';

const SearchInput = () => {
  const { searchWord, setSearchWord } = useTickerStore(
    (state) => ({ searchWord: state.searchWord, setSearchWord: state.setSearchWord }),
    shallow
  );

  return (
    <div className="relative inline-block text-right">
      <i className="absolute -translate-y-1/2 top-1/2 fa-solid fa-magnifying-glass left-2" />
      <input
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        placeholder="비트코인, btc"
        className="w-40 px-8 py-2 border border-gray-200 rounded-md dark:bg-neutral-800 focus:outline-none dark:border-neutral-700 sm:w-60"
      />
      {searchWord && (
        <i
          onClick={() => setSearchWord('')}
          className="absolute p-2 -translate-y-1/2 cursor-pointer right-2 fa-solid fa-xmark top-1/2"
        />
      )}
    </div>
  );
};

export default SearchInput;
