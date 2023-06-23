'use client';

import Image from 'next/image';
import { shallow } from 'zustand/shallow';
import { Select, Option } from '@/components/select';
import type { DomesticExchange } from '@/components/ticker/types';
import { useTickerStore } from '@/store/use-ticker-store';

const DomesticExchangeSelect = () => {
  const { domesticExchange, setDomesticExchange } = useTickerStore(
    (state) => ({ domesticExchange: state.domesticExchange, setDomesticExchange: state.setDomesticExchange }),
    shallow
  );
  const setTickerMap = useTickerStore((state) => state.setTickerMap);
  const setSearchWord = useTickerStore((state) => state.setSearchWord);

  const handleSelect = (option: string) => {
    if (domesticExchange !== option) {
      setDomesticExchange(option as DomesticExchange);
      setTickerMap();
      setSearchWord('');
    }
  };

  return (
    <Select defaultValue="UPBIT_KRW" onSelect={handleSelect}>
      <Option value="UPBIT_KRW">
        <div className="flex items-center h-5 gap-2">
          <Image width={20} height={20} src="/images/upbit.webp" alt="upbit krw" priority />
          <span className="text-xs">업비트 KRW</span>
        </div>
      </Option>
      <Option value="UPBIT_BTC">
        <div className="flex items-center h-5 gap-2">
          <Image width={20} height={20} src="/images/upbit.webp" alt="upbit btc" />
          <span className="text-xs">업비트 BTC</span>
        </div>
      </Option>
      <Option value="BITHUMB">
        <div className="flex items-center h-5 gap-2">
          <Image width={20} height={20} src="/images/bithumb.webp" alt="bithumb" priority />
          <span className="text-xs">빗썸</span>
        </div>
      </Option>
    </Select>
  );
};

export default DomesticExchangeSelect;
