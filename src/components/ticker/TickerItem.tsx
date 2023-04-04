import { formatPrice } from '@/utils/common';
import type { Ticker } from './types';
import Image from 'next/image';
import { memo } from 'react';

interface Props {
  ticker: Ticker;
  quotation?: number;
  koreanSymbol: string;
  thumb: string;
}

const convertUSDtoKRW = (price: number, quotation: number) => price * quotation;

const TickerItem = ({ ticker, quotation, koreanSymbol, thumb }: Props) => {
  const kimp = formatPrice(
    ticker.currentPrice / convertUSDtoKRW(ticker.oCurrentPrice, quotation) - 1,
    {
      style: 'percent',
      signDisplay: 'exceptZero',
      maximumFractionDigits: 2,
    }
  );

  return (
    <tr className="text-right border-b-gray-200 border-b tracking-tight [&>td]:py-1 dark:border-b-neutral-700">
      <td className="text-left">
        <div className="flex items-center gap-1">
          <Image
            src={thumb}
            alt={`${ticker.symbol} 아이콘`}
            width={15}
            height={15}
            className="rounded-full"
          />
          <p className="overflow-hidden whitespace-nowrap text-ellipsis">{koreanSymbol}</p>
        </div>
        <p className="inline-block text-gray-500">{ticker.symbol}</p>

        {ticker.caution && <span>유</span>}
      </td>

      <td className="flex flex-col">
        <p>{ticker.formattedCurrentPrice}</p>
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
            : 'text-red-600 dark:text-red-500'
        }
      >
        {ticker.currentPrice && ticker.oCurrentPrice ? `${kimp}` : ''}
      </td>

      <td
        className={
          parseFloat(ticker.changeRate) > 0 ? 'text-teal-600' : 'text-red-600 dark:text-red-500'
        }
      >
        {ticker.changeRate}%
      </td>

      <td className="flex flex-col">
        <p>{ticker.formattedTransactionAmount}</p>
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
