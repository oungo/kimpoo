import { memo } from 'react';
import { formatPrice, formatPriceText } from 'utils/common';
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
  const kimp = formatPrice((ticker.tp / convertUSDtoKRW(ticker.c, quotation)) * 100 - 100);

  return (
    <tr className="text-right border-b-gray-200 border-b">
      <td className="text-left">
        <p>a</p>
        <p className="inline-block text-gray-500">{code}</p>
        {ticker.mw === 'CAUTION' && <span>유</span>}
      </td>

      <td className="flex flex-col">
        <p>{ticker.tp > 1 ? formatPrice(ticker.tp) : ticker.tp}</p>
        <p className="text-gray-500">
          {ticker.c
            ? formatPrice(
                convertUSDtoKRW(ticker.c, quotation),
                convertUSDtoKRW(ticker.c, quotation) > 1 ? 0 : 4
              )
            : ''}
        </p>
      </td>

      <td>{ticker.c ? `${kimp}%` : ''}</td>

      <td>{formatPrice(ticker.scr * 100)}%</td>

      <td className="flex flex-col">
        <p>{formatPriceText(ticker.atp24h)}</p>
        {ticker.q && (
          <p className="text-gray-500">{formatPriceText(convertUSDtoKRW(ticker.q, quotation))}</p>
        )}
      </td>
    </tr>
  );
};

export default memo(TickerItem);
