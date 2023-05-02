import type { DomesticExchange } from '@/components/ticker/types';
import { Select, Option } from '.';
import Image from 'next/image';
import { useTickerStore } from 'store/useTickerStore';

const DomesticExchangeSelectGroup = () => {
  const setDomesticExchange = useTickerStore((state) => state.setDomesticExchange);
  const setTickerMap = useTickerStore((state) => state.setTickerMap);

  const handleSelect = (option: string) => {
    setDomesticExchange(option as DomesticExchange);
    setTickerMap(new Map());
  };

  return (
    <Select defaultValue="UPBIT_KRW" onSelect={handleSelect}>
      <Option value="UPBIT_KRW">
        <div className="flex items-center h-5 gap-2">
          <Image width={20} height={20} src="/images/upbit.webp" alt="upbit" />
          <span className="text-xs">업비트 KRW</span>
        </div>
      </Option>
      <Option value="UPBIT_BTC">
        <div className="flex items-center h-5 gap-2">
          <Image width={20} height={20} src="/images/upbit.webp" alt="upbit" />
          <span className="text-xs">업비트 BTC</span>
        </div>
      </Option>
      <Option value="BITHUMB">
        <div className="flex items-center h-5 gap-2">
          <Image width={20} height={20} src="/images/bithumb.webp" alt="bithumb" />
          <span className="text-xs">빗썸</span>
        </div>
      </Option>
    </Select>
  );
};

export default DomesticExchangeSelectGroup;
