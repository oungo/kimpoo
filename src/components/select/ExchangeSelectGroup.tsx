import { DomesticExchange } from '@/components/ticker/types';
import { Select, Option } from '.';
import { useTickerStore } from 'store/useTickerStore';

const ExchangeSelectGroup = () => {
  const setDomesticExchange = useTickerStore((state) => state.setDomesticExchange);

  const handleSelect = (option: DomesticExchange) => {
    setDomesticExchange(option);
  };

  return (
    <Select defaultValue={DomesticExchange.UPBIT} onSelect={handleSelect}>
      <Option value={DomesticExchange.UPBIT}>업비트</Option>
      <Option value={DomesticExchange.BITHUMB}>빗썸</Option>
      <Option value={DomesticExchange.COINONE}>코인원</Option>
    </Select>
  );
};

export default ExchangeSelectGroup;
