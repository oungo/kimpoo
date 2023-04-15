import { useTickerStore } from '@/store/useTickerStore';
import { formatCurrentPrice, formatNumber } from '@/utils/common';
import type { Ticker } from './types';
import Image from 'next/image';
import { memo } from 'react';

interface Props {
  ticker: Ticker;
  koreanSymbol?: string;
}

const TickerItem = ({ ticker, koreanSymbol }: Props) => {
  const coinList = useTickerStore((state) => state.coinList);

  return (
    <tr className="text-right border-b-gray-200 border-b tracking-tight [&>td]:py-1 dark:border-b-neutral-700">
      <td className="text-left">
        <div className="flex items-center gap-1">
          <Image
            src={coinList.get(ticker.symbol)?.thumb || ''}
            alt={`${ticker.symbol} 아이콘`}
            width={15}
            height={15}
            className="rounded-full"
          />
          <p className="overflow-hidden whitespace-nowrap text-ellipsis">
            {koreanSymbol || coinList.get(ticker.symbol)?.name}
          </p>
        </div>
        <p className="inline-block text-gray-500 dark:text-gray-400">{ticker.symbol}</p>

        {ticker.caution && <span>유</span>}
      </td>

      <td className="flex flex-col">
        <p>{formatCurrentPrice(ticker.currentPrice)}</p>
        <p className="text-gray-500 transition-opacity dark:text-gray-400">
          {ticker.oCurrentPrice ? formatCurrentPrice(ticker.oCurrentPrice) : '-'}
        </p>
      </td>

      <td
        className={
          !ticker.premium
            ? 'dark:text-gray-400'
            : ticker.premium > 0
            ? 'text-teal-700 dark:text-teal-600'
            : 'text-red-600 dark:text-red-500'
        }
      >
        {ticker.premium
          ? `${formatNumber(ticker.premium, {
              signDisplay: 'exceptZero',
              minimumFractionDigits: 2,
            })}%`
          : '-'}
      </td>

      <td
        className={
          !ticker.changeRate
            ? 'dark:text-white'
            : ticker.changeRate > 0
            ? 'text-teal-700 dark:text-teal-600'
            : 'text-red-600 dark:text-red-500'
        }
      >
        {ticker.changeRate &&
          formatNumber(ticker.changeRate, {
            signDisplay: 'exceptZero',
            minimumFractionDigits: 2,
            style: 'percent',
          })}
      </td>

      <td className="flex flex-col">
        <p>{formatNumber(ticker.transactionAmount, { notation: 'compact' })}</p>
        {ticker.oTransactionAmount && (
          <p className="text-gray-500 dark:text-gray-400">
            {formatNumber(ticker.oTransactionAmount, { notation: 'compact' })}
          </p>
        )}
      </td>
    </tr>
  );
};
export default memo(TickerItem);
