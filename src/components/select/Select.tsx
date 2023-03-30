import { SelectContext } from './selectContext';
import type { ReactElement } from 'react';
import { useRef, useState } from 'react';

interface ChildrenProps {
  children: string;
  value: string;
}

interface Props {
  children: ReactElement<ChildrenProps>[];
  defaultValue?: string;
  placeholder?: string;
  onSelect?: (option: string) => void;
}

const Select = ({ children, defaultValue, placeholder, onSelect }: Props) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedPlaceholder = placeholder || '선택하세요';
  const selectedOptionText = children.find(({ props: { value } }) => value === selectedOption).props
    .children;

  const selectContainerRef = useRef(null);

  const changeSelectedOption = (option: string) => {
    onSelect(option);
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <SelectContext.Provider value={{ selectedOption, changeSelectedOption }}>
      <div
        className="relative w-40 text-sm rounded-md dark:bg-neutral-800"
        ref={selectContainerRef}
      >
        <button
          className="w-full px-1 py-3 border border-gray-200 rounded-md dark:border-neutral-700"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedOptionText || selectedPlaceholder}
        </button>
        <ul
          className={`flex flex-col gap-1 border border-gray-200 rounded-md mt-1 p-1 absolute bg-white w-full ${
            showDropdown ? 'block' : 'hidden'
          }`}
        >
          {children}
        </ul>
      </div>
    </SelectContext.Provider>
  );
};

export default Select;
