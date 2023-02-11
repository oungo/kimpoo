import { memo } from "react";
import { Ticker } from "./types/types";

interface Props {
  ticker: Ticker;
}

const TickerItem = memo(({ ticker }: Props) => {
  return (
    <tr key={ticker.cd}>
      <td>{ticker.cd}</td>
      <td>{ticker.tp}</td>
      <td>{ticker.scr}</td>
      <td>{ticker.atp24h}</td>
      <td>{ticker.mw}</td>
    </tr>
  );
});

export default TickerItem;
