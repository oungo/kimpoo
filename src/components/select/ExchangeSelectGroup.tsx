import { DomesticExchangeList } from '@/components/ticker/types';
import { Select, Option } from '.';
import { useTickerStore } from 'store/useTickerStore';

const ExchangeSelectGroup = () => {
  const setDomesticExchange = useTickerStore((state) => state.setDomesticExchange);

  const handleSelect = (option: DomesticExchangeList) => {
    setDomesticExchange(option);
  };

  return (
    <Select defaultValue={DomesticExchangeList.UPBIT} onSelect={handleSelect}>
      <Option value={DomesticExchangeList.UPBIT}>업비트</Option>
      <Option value={DomesticExchangeList.BITHUMB}>빗썸</Option>
      <Option value={DomesticExchangeList.COINONE}>코인원</Option>
    </Select>
  );
};

export default ExchangeSelectGroup;
