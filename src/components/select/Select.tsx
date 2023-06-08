'use client';

import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { SelectContext } from './selectContext';
import type { ReactElement } from 'react';

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

const Select = ({ children, defaultValue = '', placeholder, onSelect }: Props) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedPlaceholder = placeholder || '선택하세요';
  const selectedOptionChild = children?.find(({ props: { value } }) => value === selectedOption)?.props.children;

  const selectContainerRef = useRef<HTMLDivElement>(null);

  const changeSelectedOption = (option: string) => {
    setShowDropdown(false);
    onSelect?.(option);
    setSelectedOption(option);
  };

  useEffect(() => {
    const clickOutsideSelect = (e: Event) => {
      if (!selectContainerRef.current?.contains(e.target as HTMLDivElement)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', clickOutsideSelect);
    return () => {
      document.removeEventListener('mousedown', clickOutsideSelect);
    };
  }, []);

  return (
    <SelectContext.Provider value={{ selectedOption, changeSelectedOption }}>
      <div
        className="relative w-full bg-white border border-gray-200 rounded-md dark:border-neutral-700 dark:bg-neutral-800 sm:w-40"
        ref={selectContainerRef}
      >
        <button
          className="w-full px-5 py-2.5 rounded-md [&>*]:justify-center"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedOptionChild || selectedPlaceholder}
        </button>
        <ul
          className={`dark:bg-neutral-800 dark:border-neutral-700 flex flex-col gap-1 border border-gray-200 rounded-md mt-1 p-1 absolute bg-white w-full z-10 ${
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
