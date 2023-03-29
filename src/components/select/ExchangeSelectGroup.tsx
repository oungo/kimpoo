import { DomesticExchange } from '@/components/ticker/types';
import { Select, Option } from '.';
import { useTickerStore } from 'store/useTickerStore';

const ExchangeSelectGroup = () => {
  const setDomesticExchange = useTickerStore((state) => state.setDomesticExchange);

  const handleSelect = (option: DomesticExchange) => {
    setDomesticExchange(option);
  };

  return (
    <Select defaultValue={DomesticExchange.UPBIT_KRW} onSelect={handleSelect}>
      <Option value={DomesticExchange.UPBIT_KRW}>업비트 KRW</Option>
      <Option value={DomesticExchange.UPBIT_BTC}>업비트 BTC</Option>
      <Option value={DomesticExchange.BITHUMB}>빗썸</Option>
    </Select>
  );
};

export default ExchangeSelectGroup;
