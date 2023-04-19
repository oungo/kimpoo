import type { DomesticExchange } from '@/components/ticker/types';
import { Select, Option } from '.';
import { useTickerStore } from 'store/useTickerStore';

const DomesticExchangeSelectGroup = () => {
  const setDomesticExchange = useTickerStore((state) => state.setDomesticExchange);

  const handleSelect = (option: string) => {
    setDomesticExchange(option as DomesticExchange);
  };

  return (
    <Select defaultValue="UPBIT_KRW" onSelect={handleSelect}>
      <Option value="UPBIT_KRW">업비트 KRW</Option>
      <Option value="UPBIT_BTC">업비트 BTC</Option>
      <Option value="BITHUMB">빗썸</Option>
    </Select>
  );
};

export default DomesticExchangeSelectGroup;
