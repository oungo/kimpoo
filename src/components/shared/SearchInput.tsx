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
        className="w-40 px-8 py-2 text-sm rounded-md bg-neutral-800 focus:outline-none"
      />
      {value && <i onClick={onClear} className="absolute -translate-y-1/2 right-2 fa-solid fa-xmark top-1/2" />}
    </div>
  );
};

export default SearchInput;
