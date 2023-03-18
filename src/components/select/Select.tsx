import { ReactNode, useRef, useState } from 'react';
import { SelectContext } from './selectContext';

interface Props {
  children: ReactNode;
  defaultValue?: string;
  placeholder?: string;
}

const Select = ({ children, defaultValue = '', placeholder }: Props) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedPlaceholder = placeholder || '선택하세요';

  const selectContainerRef = useRef(null);

  const updateSelectedOption = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <SelectContext.Provider value={{ selectedOption, changeSelectedOption: updateSelectedOption }}>
      <div className="relative w-60" ref={selectContainerRef}>
        <button
          className="w-full p-2 border border-gray-200 rounded-md"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedOption || selectedPlaceholder}
        </button>
        <ul
          className={`border border-gray-200 rounded-md mt-1 p-2 absolute bg-white w-full ${
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
