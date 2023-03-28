import TableTickerBody from './TableTickerBody';

const TableTicker = () => {
  return (
    <table className="w-full max-w-screen-lg text-xs table-fixed sm:text-sm">
      <thead>
        <tr className="text-right border-b border-b-gray-500">
          <th className="w-20 text-left">이름</th>
          <th className="w-20">현재가</th>
          <th className="w-16">김프</th>
          <th className="w-16">전일 대비</th>
          <th className="w-16">거래액(일)</th>
        </tr>
      </thead>
      <TableTickerBody />
    </table>
  );
};

export default TableTicker;
