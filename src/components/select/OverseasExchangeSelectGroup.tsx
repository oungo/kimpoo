import Image from 'next/image';
import type { OverseasExchange } from '@/components/ticker/types';
import { Select, Option } from '.';
import { useTickerStore } from 'store/useTickerStore';

const OverseasExchangeSelectGroup = () => {
  const setOverseasExchange = useTickerStore((state) => state.setOverseasExchange);

  const handleSelect = (option: string) => {
    setOverseasExchange(option as OverseasExchange);
  };

  return (
    <Select defaultValue="BINANCE_USDT" onSelect={handleSelect}>
      <Option value="BINANCE_USDT">
        <div className="flex items-center h-5 gap-2">
          <Image width={20} height={20} src="/images/binance.webp" alt="binance usdt" priority />
          <span className="text-xs">바이낸스 USDT</span>
        </div>
      </Option>
      <Option value="BINANCE_BUSD">
        <div className="flex items-center h-5 gap-2">
          <Image width={20} height={20} src="/images/binance.webp" alt="binance busd" />
          <span className="text-xs">바이낸스 BUSD</span>
        </div>
      </Option>
    </Select>
  );
};

export default OverseasExchangeSelectGroup;
