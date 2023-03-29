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
      className={`p-2 pl-10 rounded-md cursor-pointer hover:bg-gray-200 relative ${
        selectedOption === value && 'bg-gray-200 selected'
      }`}
      onClick={() => changeSelectedOption(value)}
    >
      {children}
    </li>
  );
};

export default Option;
