import { SelectContext } from './selectContext';
import { useContext } from 'react';

interface Props {
  children: string;
  value: string;
}

const Option = ({ children, value }: Props) => {
  const { selectedOption, changeSelectedOption } = useContext(SelectContext);

  return (
    <li
      className={`px-1 py-3 pl-7 rounded-md cursor-pointer hover:bg-gray-200 relative ${
        selectedOption === value && 'bg-gray-200 selected dark:bg-neutral-700'
      }`}
      onClick={() => changeSelectedOption(value)}
    >
      {children}
    </li>
  );
};

export default Option;
