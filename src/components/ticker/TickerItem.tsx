import { memo } from 'react';
import { formatPrice, formatPriceText } from 'utils/common';
import { Ticker } from './types';

interface Props {
  code: string;
  ticker: Ticker;
}

const TickerItem = ({ code, ticker }: Props) => {
  return (
    <tr>
      <td>{code}</td>
      <td>
        <p>{formatPrice(ticker.tp)}</p>
        {ticker.o && <p>{formatPrice(ticker.o)}</p>}
      </td>
      <td>김프</td>
      <td>{formatPrice(ticker.scr * 100)}%</td>
      <td>{formatPriceText(ticker.atp24h)}</td>
      <td>{ticker.mw}</td>
      {ticker.q && <td>{formatPrice(ticker.q)}</td>}
    </tr>
  );
};

export default memo(TickerItem);
