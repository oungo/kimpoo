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
    style: 'percent',
    signDisplay: 'exceptZero',
    maximumFractionDigits: 2,
  });

  return (
    <tr className="text-right border-b-gray-200 border-b tracking-tight [&>td]:py-1">
      <td className="text-left">
        <p>a</p>
        <p className="inline-block text-gray-500">{code}</p>
        {ticker.mw === 'CAUTION' && <span>유</span>}
      </td>

      <td className="flex flex-col">
        <p>{ticker.tp > 1 ? formatPrice(ticker.tp) : ticker.tp}</p>
        <p
          className={`text-gray-500 transition-opacity ${ticker.c ? 'opacity-100' : 'opacity-0 '}`}
        >
          {ticker.c &&
            formatPrice(convertUSDtoKRW(ticker.c, quotation), {
              maximumFractionDigits: convertUSDtoKRW(ticker.c, quotation) > 1 ? 0 : 4,
            })}
        </p>
      </td>

      <td
        className={
          ticker.tp / convertUSDtoKRW(ticker.c, quotation) > 1 ? 'text-teal-600' : 'text-red-600'
        }
      >
        {ticker.c ? `${kimp}` : ''}
      </td>

      <td className={ticker.scr > 0 ? 'text-teal-600' : 'text-red-600'}>
        {formatPrice(ticker.scr, {
          style: 'percent',
          signDisplay: 'exceptZero',
          maximumFractionDigits: 2,
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
