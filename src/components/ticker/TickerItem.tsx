import { TICKER_MAP } from 'constants/constants';
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
  const kimp = formatPrice(
    ticker.currentPrice / convertUSDtoKRW(ticker.oCurrentPrice, quotation) - 1,
    {
      style: 'percent',
      signDisplay: 'exceptZero',
      maximumFractionDigits: 2,
    }
  );

  return (
    <tr className="text-right border-b-gray-200 border-b tracking-tight [&>td]:py-1">
      <td className="text-left">
        <p>{TICKER_MAP.get(code)}</p>
        <p className="inline-block text-gray-500">{code}</p>
        {ticker.caution && <span>유</span>}
      </td>

      <td className="flex flex-col">
        <p>{ticker.currentPrice > 1 ? formatPrice(ticker.currentPrice) : ticker.currentPrice}</p>
        <p
          className={`text-gray-500 transition-opacity ${
            ticker.oCurrentPrice ? 'opacity-100' : 'opacity-0 '
          }`}
        >
          {ticker.oCurrentPrice &&
            formatPrice(convertUSDtoKRW(ticker.oCurrentPrice, quotation), {
              maximumFractionDigits: convertUSDtoKRW(ticker.oCurrentPrice, quotation) > 1 ? 0 : 4,
            })}
        </p>
      </td>

      <td
        className={
          ticker.currentPrice / convertUSDtoKRW(ticker.currentPrice, quotation) > 1
            ? 'text-teal-600'
            : 'text-red-600'
        }
      >
        {ticker.oCurrentPrice ? `${kimp}` : ''}
      </td>

      <td className={ticker.changeRate > 0 ? 'text-teal-600' : 'text-red-600'}>
        {formatPrice(ticker.changeRate, {
          style: 'percent',
          signDisplay: 'exceptZero',
          maximumFractionDigits: 2,
        })}
      </td>

      <td className="flex flex-col">
        <p>{formatPrice(ticker.transactionAmount, { notation: 'compact' })}</p>
        {ticker.oTransactionAmount && (
          <p className="text-gray-500">
            {formatPrice(convertUSDtoKRW(ticker.oTransactionAmount, quotation), {
              notation: 'compact',
            })}
          </p>
        )}
      </td>
    </tr>
  );
};

export default memo(TickerItem);
