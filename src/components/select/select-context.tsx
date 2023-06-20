'use client';

import { createContext } from 'react';

interface ContextValue {
  selectedOption: string;
  changeSelectedOption?: (option: string) => void;
}
const SelectContext = createContext<ContextValue>({ selectedOption: '' });

export { SelectContext };
