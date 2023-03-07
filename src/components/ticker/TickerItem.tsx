import { memo } from 'react';
import { formatPrice } from 'utils/common';
import { Ticker } from './types';

interface Props {
  code: string;
  ticker: Ticker;
  quotation?: number;
}

const convertUSDtoKRW = (price: number | string, quotation: number) => {
  return Number(price) * quotation;
};

const TickerItem = ({ code, ticker, quotation }: Props) => {
  const kimp = formatPrice(ticker.tp / convertUSDtoKRW(ticker.c, quotation) - 1, {
    signDisplay: 'exceptZero',
    maximumFractionDigits: 2,
    style: 'percent',
  });

  return (
    <tr className="text-right border-b-gray-200 border-b tracking-tight">
      <td className="text-left">
        <p>a</p>
        <p className="inline-block text-gray-500">{code}</p>
        {ticker.mw === 'CAUTION' && <span>유</span>}
      </td>

      <td className="flex flex-col">
        <p>{ticker.tp > 1 ? formatPrice(ticker.tp) : ticker.tp}</p>
        {ticker.c && (
          <p className="text-gray-500">
            {formatPrice(convertUSDtoKRW(ticker.c, quotation), {
              maximumFractionDigits: convertUSDtoKRW(ticker.c, quotation) > 1 ? 0 : 4,
            })}
          </p>
        )}
      </td>

      <td>{ticker.c ? `${kimp}` : ''}</td>

      <td>
        {formatPrice(ticker.scr, {
          style: 'percent',
          maximumFractionDigits: 2,
          signDisplay: 'exceptZero',
        })}
      </td>

      <td className="flex flex-col">
        <p>{formatPrice(ticker.atp24h, { notation: 'compact' })}</p>
        {ticker.q && (
          <p className="text-gray-500">
            {formatPrice(convertUSDtoKRW(ticker.q, quotation), { notation: 'compact' })}
          </p>
        )}
      </td>
    </tr>
  );
};

export default memo(TickerItem);
