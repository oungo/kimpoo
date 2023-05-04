import { useContext } from 'react';
import { SelectContext } from './selectContext';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  value: string;
}

const Option = ({ children, value, ...props }: Props) => {
  const { selectedOption, changeSelectedOption } = useContext(SelectContext);

  return (
    <li
      className={`px-1 py-3 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 relative flex items-center justify-center ${
        selectedOption === value && 'bg-gray-200 dark:bg-neutral-700'
      }`}
      onClick={() => changeSelectedOption?.(value)}
      {...props}
    >
      {selectedOption === value && <i className="absolute text-xs left-2 fa-solid fa-check" />}
      {children}
    </li>
  );
};

export default Option;
