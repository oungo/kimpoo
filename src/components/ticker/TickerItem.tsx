import { Quatation } from 'api/fetchQuotation';
import { memo } from 'react';
import { formatPrice, formatPriceText } from 'utils/common';
import { Ticker } from './types';

interface Props {
  code: string;
  ticker: Ticker;
  quotation?: number;
}

const TickerItem = ({ code, ticker, quotation }: Props) => {
  console.log(quotation);
  return (
    <tr>
      <td>{code}</td>

      <td>
        <p>{formatPrice(ticker.tp)}</p>
        {ticker.o && <p>{formatPrice(parseInt(ticker.o) * quotation)}</p>}
      </td>

      <td>{ticker.tp / (Number(ticker.o) * quotation)}</td>

      <td>{formatPrice(ticker.scr * 100)}%</td>

      <td>{formatPriceText(ticker.atp24h)}</td>

      <td>{ticker.mw}</td>

      {ticker.q && <td>{formatPrice(ticker.q)}</td>}
    </tr>
  );
};

export default memo(TickerItem);
