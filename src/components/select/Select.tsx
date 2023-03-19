import { ReactElement, useRef, useState } from 'react';
import { SelectContext } from './selectContext';

interface ChildrenProps {
  children: string;
  value: string;
}

interface Props {
  children: ReactElement<ChildrenProps>[];
  defaultValue?: string;
  placeholder?: string;
}

const Select = ({ children, defaultValue, placeholder }: Props) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedPlaceholder = placeholder || '선택하세요';
  const selectedOptionText = children.find(({ props: { value } }) => value === selectedOption).props
    .children;

  const selectContainerRef = useRef(null);

  const changeSelectedOption = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <SelectContext.Provider value={{ selectedOption, changeSelectedOption }}>
      <div className="relative w-60" ref={selectContainerRef}>
        <button
          className="w-full p-2 border border-gray-200 rounded-md"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedOptionText || selectedPlaceholder}
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
