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
    <tr>
      <td>{code}</td>

      <td>
        <p>{formatPrice(ticker.tp)}</p>
        {ticker.c && <p>{formatPrice(convertUSDtoKRW(ticker.c, quotation), 0)}</p>}
      </td>

      {ticker.c && <td>{kimp}%</td>}

      <td>{formatPrice(ticker.scr * 100)}%</td>

      <td>{ticker.mw}</td>

      <td>
        <p>{formatPriceText(ticker.atp24h)}</p>
        {ticker.q && <p>{formatPriceText(convertUSDtoKRW(ticker.q, quotation))}</p>}
      </td>
    </tr>
  );
};

export default memo(TickerItem);
