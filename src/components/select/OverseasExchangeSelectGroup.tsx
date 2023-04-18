import type { OverseasExchange } from '@/components/ticker/types';
import { Select, Option } from '.';
import { useTickerStore } from 'store/useTickerStore';

const OverseasExchangeSelectGroup = () => {
  const setOverseasExchange = useTickerStore((state) => state.setOverseasExchange);

  const handleSelect = (option: OverseasExchange) => {
    setOverseasExchange(option);
  };

  return (
    <Select defaultValue="BINANCE_USDT" onSelect={handleSelect}>
      <Option value="BINANCE_USDT">바이낸스 USDT</Option>
      <Option value="BINANCE_BUSD">바이낸스 BUSD</Option>
    </Select>
  );
};

export default OverseasExchangeSelectGroup;
