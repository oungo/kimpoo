import type { ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const SearchInput = ({ value, onChange, onClear }: Props) => {
  return (
    <div className="relative inline-block">
      <i className="absolute -translate-y-1/2 top-1/2 fa-solid fa-magnifying-glass left-2" />
      <input
        value={value}
        onChange={onChange}
        placeholder="비트코인, btc"
        className="w-40 px-8 py-2 text-sm border border-gray-200 rounded-md dark:bg-neutral-800 focus:outline-none dark:border-neutral-700 sm:w-60"
      />
      {value && <i onClick={onClear} className="absolute -translate-y-1/2 right-2 fa-solid fa-xmark top-1/2" />}
    </div>
  );
};

export default SearchInput;
