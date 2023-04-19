import { SelectContext } from './selectContext';
import type { ReactNode } from 'react';
import { useContext } from 'react';

interface Props {
  children: ReactNode;
  value: string;
}

const Option = ({ children, value, ...props }: Props) => {
  const { selectedOption, changeSelectedOption } = useContext(SelectContext);

  return (
    <li
      className={`px-1 py-3 pl-7 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 relative ${
        selectedOption === value && 'bg-gray-200 selected dark:bg-neutral-700'
      }`}
      onClick={() => changeSelectedOption?.(value)}
      {...props}
    >
      {children}
    </li>
  );
};

export default Option;
