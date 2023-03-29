import TableTickerBody from './TableTickerBody';

const TableTicker = () => (
  <table className="w-full max-w-screen-lg text-xs table-fixed sm:text-sm">
    <colgroup>
      <col width="30%" />
      <col />
      <col />
      <col />
      <col />
    </colgroup>
    <thead>
      <tr className="text-right border-b border-b-gray-500">
        <th className="text-left">이름</th>
        <th>현재가</th>
        <th>김프</th>
        <th>전일 대비</th>
        <th>거래액(일)</th>
      </tr>
    </thead>
    <TableTickerBody />
  </table>
);

export default TableTicker;
