import Image from 'next/image';
import { memo } from 'react';
import { useFlashTextAnimation } from '@/hooks/useFlashTextAnimation';
import { formatCurrentPrice, formatNumber, formatPercent } from '@/utils/common';
import type { Ticker } from './types';

interface Props {
  ticker: Ticker;
  thumb?: string;
  priority: boolean;
}

const TickerItem = ({ ticker, thumb, priority }: Props) => {
  const ref = useFlashTextAnimation();

  return (
    <tr className="text-right border-b-gray-200 border-b tracking-tight [&>td]:py-1 dark:border-b-neutral-700">
      <td className="text-left">
        <div className="flex items-center gap-1">
          {thumb ? (
            <Image
              unoptimized
              src={thumb}
              alt={`${ticker.symbol} 아이콘`}
              width={15}
              height={15}
              className="rounded-full"
              priority={!!priority}
            />
          ) : (
            <div className="w-[15px] h-[15px] rounded-full bg-gray-500 dark:bg-gray-400" />
          )}

          <p className="overflow-hidden whitespace-nowrap text-ellipsis">{ticker.symbolName}</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="inline-block text-gray-500 dark:text-gray-400">{ticker.symbol}</p>
          {ticker.caution && <i className="text-yellow-400 fa-solid fa-circle-exclamation" />}
        </div>
      </td>

      <td ref={ref} className="flex flex-col">
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
        {ticker.premium ? `${formatPercent(ticker.premium)}` : '-'}
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
        {ticker.changeRate && formatPercent(ticker.changeRate)}
      </td>

      <td className="flex flex-col">
        <p>{formatNumber(ticker.transactionAmount, { notation: 'compact' })}</p>

        <p className="text-gray-500 dark:text-gray-400">
          {ticker.oTransactionAmount ? formatNumber(ticker.oTransactionAmount, { notation: 'compact' }) : '-'}
        </p>
      </td>
    </tr>
  );
};

export default memo(TickerItem);
